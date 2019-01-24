import * as React from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlProjection from 'ol/proj/Projection';
import { mapContext, IInfoLayer } from './RomapContext';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';
import { MapChild } from './RomapChild';
import { Projection } from './Projection';
import { mountInfoLayers, updateInfoLayers } from './utils';

export interface IMapProps {
  /**
   * Children.
   */
  children: React.ReactNode;
  /**
   * Class name.
   */
  className?: string;
  /**
   * Keyboard Event Target.
   */
  keyboardEventTarget?: any;
  /**
   * View center.
   */
  center?: [number, number];
  /*
   * View zoom.
   */
  zoom?: number;
  /*
   * View resolution.
   */
  resolution?: number;
  /*
   * View rotation.
   */
  rotation?: number;
  /*
   * View projection.
   */
  projection?: OlProjection | string;
}

export interface IMapState {
  /**
   * Info layers.
   */
  infoLayers: Map<string, IInfoLayer>;
}

export class Romap extends React.Component<IMapProps, IMapState> {
  public static defaultProps = {
    className: 'map'
  };

  /**
   * OpenLayers map.
   */
  private olMap: OlMap;

  /**
   * OpenLayers view.
   */
  private olView: OlView;

  /**
   * Div.
   */
  private divMap: any;

  constructor(props: IMapProps) {
    super(props);
    this.olMap = new OlMap({
      controls: [],
      keyboardEventTarget: props.keyboardEventTarget
    });
    this.olView = new OlView({
      center: [0, 0],
      zoom: 2
    });
    this.olMap.setView(this.olView);
    this.stopPropagationForComponents();
    this.state = { infoLayers: new Map<string, IInfoLayer>() };
  }

  public componentDidMount() {
    this.olMap.setTarget(this.divMap);
    mountInfoLayers(this.setInfoLayer, this.props.children, null);
    // View
    const view = new OlView({
      center: this.props.center,
      zoom: this.props.zoom,
      resolution: this.props.resolution,
      rotation: this.props.rotation,
      projection: this.props.projection
    });
    this.olMap.setView(view);
  }

  public componentDidUpdate(prevProps: IMapProps) {
    updateInfoLayers(this.setInfoLayer, prevProps.children, this.props.children, null, null);
    // View
    const view = new OlView({
      center: this.props.center,
      zoom: this.props.zoom,
      resolution: this.props.resolution,
      rotation: this.props.rotation,
      projection: this.props.projection
    });
    this.olMap.setView(view);
  }

  public getInfoLayers = (parentId: string = null) => {
    const infoLayers: IInfoLayer[] = [];
    this.state.infoLayers.forEach((infoLayer, id) => {
      if (infoLayer.parentId === parentId) {
        infoLayers.push(infoLayer);
      }
    });
    return infoLayers;
  };

  public getInfoLayer = (id: string, parentId?: string) => {
    const infoLayer = this.state.infoLayers.get(id);
    if (parentId) {
      return infoLayer.parentId === parentId ? infoLayer : null;
    }
    return infoLayer;
  };

  public setInfoLayer = (infoLayer: IInfoLayer, setStateIfChanging: boolean = true) => {
    const infoLayers = this.state.infoLayers;
    let changed = false;
    const found = infoLayers.get(infoLayer.reactBaseLayerProps.id);
    if (!found) {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'ext_add'
      });
      changed = true;
    } else if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'orig_modif_by_ext'
      });
      changed = true;
    } else if (infoLayer.status === 'ext_add') {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'ext_add'
      });
      changed = true;
    }
    if (setStateIfChanging && changed) {
      this.setState({ infoLayers });
    }
  };

  public deleteInfoLayer = (id: string, setStateIfChanging: boolean = true) => {
    const infoLayers = this.state.infoLayers;
    let changed = false;
    const found = infoLayers.get(id);
    if (found) {
      if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
        infoLayers.set(id, {
          ...found,
          status: 'orig_del_by_ext'
        });
        changed = true;
      } else {
        infoLayers.delete(id);
        changed = true;
      }
    }
    if (setStateIfChanging && changed) {
      this.setState({ infoLayers });
    }
  };

  public stopPropagationForComponents() {
    // Stop event propagation for components
    this.olMap.on('click', this.stopEventPropagation);
    this.olMap.on('singleclick', this.stopEventPropagation);
    this.olMap.on('dblclick', this.stopEventPropagation);
    this.olMap.on('pointerdrag', this.stopEventPropagation);
    this.olMap.on('wheel', this.stopEventPropagation);
  }

  public stopEventPropagation(event: any) {
    if (event == null || event.originalEvent == null || event.originalEvent.target == null) {
      return;
    }
    const elem = event.originalEvent.target;
    if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
      event.stopPropagation();
    }
  }

  public renderLayers(): React.ReactElement<BaseLayer<any, any, any, any>>[] {
    const elems: React.ReactElement<BaseLayer<any, any, any, any>>[] = [];
    this.getInfoLayers().forEach((infoLayer: IInfoLayer) => {
      if (
        infoLayer.status === 'orig_add' ||
        infoLayer.status === 'ext_add' ||
        infoLayer.status === 'orig_modif_by_ext'
      ) {
        const props = { ...infoLayer.reactBaseLayerProps, key: infoLayer.reactBaseLayerProps.id };
        elems.push(React.cloneElement(infoLayer.reactBaseLayerElement, props));
      }
    });
    return elems;
  }

  public renderNonLayers(): React.ReactNode {
    const elems: React.ReactElement<MapChild<any, any>>[] = [];
    React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
      if (
        MapChild.isPrototypeOf(child.type) &&
        !BaseLayer.isPrototypeOf(child.type) &&
        !Projection.isPrototypeOf(child.type)
      ) {
        elems.push(child);
      }
    });
    elems.push(...this.renderLayers());
    return elems;
  }

  public render(): React.ReactNode {
    return (
      <div className={this.props.className}>
        <div
          ref={divMap => {
            this.divMap = divMap;
          }}
          className={`${this.props.className}-olmap`}
        />
        <mapContext.Provider
          value={{
            olMap: this.olMap,
            olGroup: this.olMap.getLayerGroup(),
            getInfoLayers: this.getInfoLayers,
            getInfoLayer: this.getInfoLayer,
            setInfoLayer: this.setInfoLayer,
            deleteInfoLayer: this.deleteInfoLayer,
            getLocalizedText: (code: string, defaultText: string) => {
              return defaultText;
            }
          }}
        >
          {this.renderNonLayers()}
          {this.renderLayers()}
        </mapContext.Provider>
      </div>
    );
  }
}
