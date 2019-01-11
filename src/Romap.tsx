import * as React from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { mapContext, IInfoLayer } from './RomapContext';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';
import { MapChild } from './RomapChild';
import { Projection } from './Projection';
import { mountInfoLayers, updateInfoLayers, setInfoLayerInMap } from './utils';


export interface IMapProps {
  /**
   * Children.
   */
  children?: React.ReactNode;
  /**
   * Class name.
   */
  className?: string;
  /**
   * Keyboard Event Target.
   */
  keyboardEventTarget?: any;
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
    const infoLayers = new Map<string, IInfoLayer>();
    mountInfoLayers(infoLayers, this.props.children);
    this.setState({ infoLayers });
  }

  public componentDidUpdate() {
    const infoLayers = new Map<string, IInfoLayer>(this.state.infoLayers);
    const changed = updateInfoLayers(infoLayers, this.props.children);
    if (changed) {
      this.setState({ infoLayers });
    }
  }

  public setInfoLayer = (infoLayer: IInfoLayer) => {
    const infoLayers = new Map<string, IInfoLayer>(this.state.infoLayers);
    const changed = setInfoLayerInMap(infoLayers, infoLayer);
    if (changed) {
      this.setState({ infoLayers });
    }
  }

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
    this.state.infoLayers.forEach((infoLayer: IInfoLayer) => {
      if (infoLayer.status === 'orig_add' || infoLayer.status === 'ext_add' || infoLayer.status === 'orig_modif_by_ext') {
        const props = { ...infoLayer.reactBaseLayerProps, key: infoLayer.reactBaseLayerProps.id };
        elems.push(React.cloneElement(infoLayer.reactBaseLayerElement, props));
      }
    });
    return elems;
  }

  public renderChildren(): React.ReactNode {
    const elems: React.ReactElement<MapChild<any, any>>[] = [];
    React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
      if (MapChild.isPrototypeOf(child.type) && !BaseLayer.isPrototypeOf(child.type) && !Projection.isPrototypeOf(child.type)) {
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
            infoLayers: this.state.infoLayers,
            setInfoLayer: this.setInfoLayer
          }}
        >
          {this.renderChildren()}
        </mapContext.Provider>
      </div>
    );
  }
}
