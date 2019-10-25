import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import { BaseLayer, IBaseLayerProps } from './layer';
import { jsonEqual } from './utils';

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

  private refresh: () => void;

  constructor(uid: React.Key, refresh: () => void) {
    this.uid = uid;
    this.refresh = refresh;
    layerMaps.set(uid, new Map<React.Key, ILayerElement>());
  }

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
            this.setLayerElement(
              {
                reactElement: React.cloneElement(nextChild, props),
                status: 'react',
                updatedProps: layerElement != null ? layerElement.updatedProps : {},
                uid
              },
              layerElement == null
            );
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
