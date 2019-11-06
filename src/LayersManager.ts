import * as React from 'react';
import OlMap from 'ol/Map';
import OlBaseLayer from 'ol/layer/Base';
import { BaseLayer, IBaseLayerProps, Vector, Tile, Image } from './layer';
import { jsonEqual } from './utils';
import { ISnapshotGetter, ISnapshot, ISnapshotLayer } from './ISnapshot';
import {
  IExtended,
  ExternalVector,
  ImageStatic,
  ImageWms,
  LocalVector,
  QueryArcGISRest,
  TileArcGISRest,
  TileWms,
  Wfs,
  Xyz,
  ImageArcGISRest
} from './source';

export type layerElementStatus = null | 'react' | 'ext' | 'del';

export interface ILayerElement {
  /**
   * React Element.
   */
  reactElement: Readonly<React.ReactElement>;
  /**
   * Unique id.
   */
  uid: Readonly<React.Key>;
  /**
   * Updated props.
   */
  updatedProps: any;
  /**
   * Status.
   */
  status: Readonly<layerElementStatus>;
  /**
   * Openlayers layer.
   */
  olLayer?: OlBaseLayer;
}

const layerMaps = new Map<React.Key, Map<React.Key, ILayerElement>>();

export class LayersManager {
  private uid: React.Key;

  private olMap: OlMap;

  private refresh: () => void;

  private snapshotGetter: ISnapshotGetter;

  constructor(uid: React.Key, olMap: OlMap, refresh: () => void, snapshotGetter: ISnapshotGetter) {
    this.uid = uid;
    this.olMap = olMap;
    this.refresh = refresh;
    this.snapshotGetter = snapshotGetter;
    if (this.snapshotGetter) {
      this.snapshotGetter.getSnapshot = this.getSnapshot;
    }
    layerMaps.set(uid, new Map<React.Key, ILayerElement>());
  }

  /**
   * Get Openlayers map.
   */
  public getOlMap(): OlMap {
    return this.olMap;
  }

  /**
   * Get snapshot.
   */
  public getSnapshot = (): ISnapshot => {
    const view = this.olMap.getView();
    const center = view.getCenter();
    const layers: Array<ISnapshotLayer> = [];
    this.getLayerElements().map(layerElement => {
      const props = { ...layerElement.reactElement.props, ...layerElement.updatedProps };
      const source = props['source'];
      if (
        source != null &&
        'getSourceTypeName' in source &&
        'getSourceOptions' in source &&
        'isSnapshotable' in source
      ) {
        if ((source as IExtended).isSnapshotable()) {
          props['source'] = undefined;
          props['children'] = undefined;
          layers.push({
            getSourceTypeName: (source as IExtended).getSourceTypeName(),
            getSourceOptions: (source as IExtended).getSourceOptions(),
            props
          });
        }
      }
    });
    return {
      view: {
        center: [center[0], center[1]],
        zoom: view.getZoom(),
        projectionCode: view.getProjection().getCode()
      },
      layers
    };
  };

  /**
   * Reload from snapshot.
   */
  public reloadFromSnapshot = (snapshot: ISnapshot) => {};

  /**
   * Get infoElements
   */
  public getLayerElements(
    filterFn?: (value: ILayerElement, index: number, array: ILayerElement[]) => boolean,
    thisFilterArg?: any
  ): ILayerElement[] {
    const layerMap = layerMaps.get(this.uid);
    if (layerMap == null) {
      return [];
    }
    const arr = Array.from(layerMap.values()).filter(layerElement => layerElement.status !== 'del');
    return filterFn == null ? arr : arr.filter(filterFn, thisFilterArg);
  }

  /**
   * Set layerElement
   */
  private setLayerElement(layerElement: ILayerElement, refreshIfChanging = true) {
    const layerMap = layerMaps.get(this.uid);
    if (layerMap == null) {
      return false;
    }
    const found = layerMap.get(layerElement.uid);
    let changed = false;
    if (!found) {
      if (layerElement.status !== 'del') {
        layerMap.set(layerElement.uid, {
          ...layerElement
        });
        changed = true;
      }
    } else {
      if (layerElement.status === 'del') {
        layerMap.set(layerElement.uid, {
          ...layerElement,
          status: 'del'
        });
        changed = true;
      } else {
        layerMap.set(layerElement.uid, {
          ...layerElement
        });
        changed = !jsonEqual(found.reactElement.props, layerElement.reactElement.props, ['source', 'children']);
      }
    }
    if (refreshIfChanging && changed) {
      this.refresh();
    }
  }

  /**
   * Update layer props
   */
  public updateLayerProps(uid: React.Key, props: any, refreshIfChanging = true) {
    const layerElement = this.getLayerElements(layerElement => layerElement.uid == uid).pop();
    if (layerElement != null) {
      this.setLayerElement(
        {
          ...layerElement,
          reactElement: React.cloneElement(layerElement.reactElement, {
            ...layerElement.reactElement.props,
            ...props,
            uid,
            key: uid
          }),
          updatedProps: { ...layerElement.updatedProps, ...props }
        },
        refreshIfChanging
      );
    } else {
      console.error(`Element not found for uid ${uid}`);
    }
  }

  /**
   * Set Openlayers layer
   */
  public setOlLayer(uid: React.Key, olLayer: OlBaseLayer) {
    const layerElement = this.getLayerElements(layerElement => layerElement.uid == uid).pop();
    if (layerElement != null) {
      layerElement.olLayer = olLayer;
    } else {
      console.error(`Element not found for uid ${uid}`);
    }
  }

  /**
   * Get Openlayers layer
   */
  public getOlLayer(uid: React.Key): OlBaseLayer {
    const layerElement = this.getLayerElements(layerElement => layerElement.uid == uid).pop();
    if (layerElement != null) {
      return layerElement.olLayer;
    } else {
      console.error(`Element not found for uid ${uid}`);
      return null;
    }
  }

  /**
   * Create and add layer props
   */
  public createAndAddLayer(
    cl: React.ClassType<IBaseLayerProps, BaseLayer<IBaseLayerProps, any, any, any>, any>,
    props: IBaseLayerProps
  ) {
    const reactElement = React.createElement(cl, {
      ...props,
      uid: props.uid
    });
    this.setLayerElement({
      reactElement,
      uid: props.uid,
      updatedProps: {},
      status: 'ext'
    });
  }

  /**
   * Create and add layer props
   */
  public createAndAddLayerFromSource(
    getSourceTypeName: string,
    getSourceOptions: any,
    props: IBaseLayerProps
  ): IExtended {
    let source: IExtended;
    switch (getSourceTypeName) {
      case 'ExternalVector':
        source = new ExternalVector(getSourceOptions);
        this.createAndAddLayer(Vector, { ...props, source });
        break;
      case 'ImageArcGISRest':
        source = new ImageArcGISRest(getSourceOptions);
        this.createAndAddLayer(Image, { ...props, source });
        break;
      case 'ImageStatic':
        source = new ImageStatic(getSourceOptions);
        this.createAndAddLayer(Image, { ...props, source });
        break;
      case 'ImageWms':
        source = new ImageWms(getSourceOptions);
        this.createAndAddLayer(Image, { ...props, source });
        break;
      case 'LocalVector':
        source = new LocalVector(getSourceOptions);
        this.createAndAddLayer(Vector, { ...props, source });
        break;
      case 'QueryArcGISRest':
        source = new QueryArcGISRest(getSourceOptions);
        this.createAndAddLayer(Vector, { ...props, source });
        break;
      case 'TileArcGISRest':
        source = new TileArcGISRest(getSourceOptions);
        this.createAndAddLayer(Tile, { ...props, source });
        break;
      case 'TileWms':
        source = new TileWms(getSourceOptions);
        this.createAndAddLayer(Tile, { ...props, source });
        break;
      case 'Wfs':
        source = new Wfs(getSourceOptions);
        this.createAndAddLayer(Vector, { ...props, source });
        break;
      case 'Xyz':
        source = new Xyz(getSourceOptions);
        this.createAndAddLayer(Tile, { ...props, source });
        break;
    }
    return source;
  }

  /**
   * Update from children
   */
  public fromChildren(nextChildren: React.ReactNode) {
    const toDel = new Set<React.Key>();
    // Old children
    this.getLayerElements(layerElement => layerElement.status === 'react').map(layerElement => {
      toDel.add(layerElement.uid);
    });
    // Next children
    if (nextChildren) {
      React.Children.map(nextChildren, (nextChild: React.ReactElement<any>) => {
        if (nextChild != null && BaseLayer.isPrototypeOf(nextChild.type)) {
          const uid = nextChild.props.uid;
          // uid is null: log error
          if (uid == null) {
            console.error('Unique id is mandatory');
          } else {
            if (toDel.has(uid)) {
              toDel.delete(uid);
            }
            const layerElement = this.getLayerElements(layerElement => layerElement.uid == uid).pop();
            const props = { ...nextChild.props, ...(layerElement != null ? layerElement.updatedProps : {}), key: uid };
            this.setLayerElement({
              reactElement: React.cloneElement(nextChild, props),
              status: 'react',
              updatedProps: layerElement != null ? layerElement.updatedProps : {},
              uid
            });
            if (layerElement != null) {
              this.updateLayerProps(uid, layerElement.reactElement.props, false);
              this.setOlLayer(uid, layerElement.olLayer);
            }
          }
        }
      });
    }
    // Set status to 'del' removed children
    toDel.forEach((uid: React.Key) => {
      const layerElement = this.getLayerElements(layerElement => layerElement.uid == uid).pop();
      if (layerElement != null) {
        layerElement.status = 'del';
      }
    });
  }
}
