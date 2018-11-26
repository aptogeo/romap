import * as React from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { mapContext } from './MapContext';

export interface IMapProps {
  /**
   * Content.
   */
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  /**
   * Class name.
   */
  className?: string;
  /**
   * Keyboard Event Target.
   */
  keyboardEventTarget?: any;
}

export class Map extends React.Component<IMapProps, {}> {
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

  public render(): any {
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
            olGroup: this.olMap.getLayerGroup()
          }}
        >
          {this.props.children}
        </mapContext.Provider>
      </div>
    );
  }
}
