import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlProjection from 'ol/proj/Projection';
import { mapContext } from './RomapContext';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';
import { RomapChild } from './RomapChild';
import { RomapManager, RomapManagerState } from './RomapManager';
import { IBaseToolProps, BaseTool } from './tool/BaseTool';
import { BaseContainer } from './container/BaseContainer';

const GlobalStyle = createGlobalStyle`
  .ol-unsupported {
    display: none;
  }

  .ol-viewport, .ol-unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .ol-selectable {
    -webkit-touch-callout: default;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  .ol-control {
    position: absolute;
  }

  .ol-hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s linear 0s, visibility 0s linear 0.25s;
  }
`;

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
   * Style.
   */
  style?: React.CSSProperties;
  /**
   * Style.
   */
  olMapStyle?: React.CSSProperties;
  /**
   * Keyboard Event Target.
   */
  keyboardEventTarget?: any;
  /**
   * Initial view center.
   */
  initialViewCenter?: [number, number];
  /*
   * Initial view zoom.
   */
  initialViewZoom?: number;
  /*
   * Initial view resolution.
   */
  initialViewResolution?: number;
  /*
   * Initial view rotation.
   */
  initialViewRotation?: number;
  /*
   * Initial view projection.
   */
  initialViewProjection?: OlProjection | string;
}

export class Romap extends RomapManager<IMapProps, RomapManagerState> {
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
  }

  public componentDidMount() {
    this.olMap.setTarget(this.divMap);
    this.updateFromChildren(null, this.props.children, null, null);
    // View
    if (this.props.initialViewCenter != null && this.props.initialViewZoom != null) {
      const view = new OlView({
        center: this.props.initialViewCenter,
        zoom: this.props.initialViewZoom,
        resolution: this.props.initialViewResolution,
        rotation: this.props.initialViewRotation,
        projection: this.props.initialViewProjection
      });
      this.olMap.setView(view);
    }
  }

  public componentDidUpdate(prevProps: IMapProps) {
    this.updateFromChildren(prevProps.children, this.props.children, null, null);
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

  public renderNonRomapChildren(): React.ReactNode {
    const elems: React.ReactElement<IBaseLayerProps>[] = [];
    React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
      if (!RomapChild.isPrototypeOf(child.type)) {
        elems.push(child);
      }
    });
    return elems;
  }

  public renderRomapChildren(): React.ReactElement<IBaseToolProps>[] {
    const elems: React.ReactElement<IBaseToolProps>[] = [];
    // Layers
    this.getInfoElements().forEach(infoElement => {
      if (BaseLayer.isPrototypeOf(infoElement.reactElement.type)) {
        elems.push(React.cloneElement(infoElement.reactElement, { key: infoElement.id }));
      }
    });
    // Containers & Tools
    this.getInfoElements(infoElement => infoElement.parentId == null).forEach(infoElement => {
      if (
        BaseContainer.isPrototypeOf(infoElement.reactElement.type) ||
        BaseTool.isPrototypeOf(infoElement.reactElement.type)
      ) {
        elems.push(React.cloneElement(infoElement.reactElement, { key: infoElement.id }));
      }
    });
    return elems;
  }

  public render(): React.ReactNode {
    return (
      <div className={this.props.className} style={this.props.style}>
        <GlobalStyle />
        <div
          ref={divMap => {
            this.divMap = divMap;
          }}
          className={`${this.props.className}-olmap`}
          style={this.props.olMapStyle}
        />
        <mapContext.Provider
          value={{
            olMap: this.olMap,
            olGroup: this.olMap.getLayerGroup(),
            romapManager: this,
            getLocalizedText: (code: string, defaultText: string) => {
              return defaultText;
            }
          }}
        >
          {this.renderNonRomapChildren()}
          {this.renderRomapChildren()}
        </mapContext.Provider>
      </div>
    );
  }
}
