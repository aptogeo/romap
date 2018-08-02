import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import OlView from 'ol/View';

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

  public static childContextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: OlMap,
    /**
     * OpenLayers group.
     */
    olGroup: GroupLayer
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

  public componentWillMount() {
    this.olMap = new OlMap({
      controls: [],
      keyboardEventTarget: this.props.keyboardEventTarget
    });
    this.olView = new OlView({
      center: [0, 0],
      zoom: 2
    });
    this.olMap.setView(this.olView);
    // Stop event propagation from Popup
    this.olMap.on('click', (event: any) => {
      const elem = event.originalEvent.target;
      if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
        event.stopPropagation();
      }
    });
    this.olMap.on('singleclick', (event: any) => {
      const elem = event.originalEvent.target;
      if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
        event.stopPropagation();
      }
    });
    this.olMap.on('dblclick', (event: any) => {
      const elem = event.originalEvent.target;
      if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
        event.stopPropagation();
      }
    });
    this.olMap.on('pointerdrag', (event: any) => {
      const elem = event.originalEvent.target;
      if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
        event.stopPropagation();
      }
    });
    this.olMap.on('wheel', (event: any) => {
      const elem = event.originalEvent.target;
      if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
        event.stopPropagation();
      }
    });
    // Loading counter
    this.olMap.set('loadingCounter', 0);
    this.olMap.increaseLoadingCounter = this.increaseLoadingCounter.bind(this);
    this.olMap.decreaseLoadingCounter = this.decreaseLoadingCounter.bind(this);
  }

  public componentDidMount() {
    this.olMap.setTarget(this.divMap);
  }

  public getChildContext() {
    return {
      olMap: this.olMap,
      olGroup: this.olMap.getLayerGroup()
    };
  }

  public increaseLoadingCounter() {
    const c = this.olMap.get('loadingCounter');
    if (c <= 0) {
      this.olMap.set('loadingCounter', 1, true);
      this.olMap.dispatchEvent('loadstart');
    } else {
      this.olMap.set('loadingCounter', c + 1, true);
    }
  }

  public decreaseLoadingCounter() {
    const c = this.olMap.get('loadingCounter');
    if (c <= 1) {
      this.olMap.set('loadingCounter', 0, true);
      setTimeout(() => {
        if (this.olMap.get('loadingCounter') === 0) {
          this.olMap.dispatchEvent('loadend');
        }
      }, 200);
    } else {
      this.olMap.set('loadingCounter', c - 1, true);
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
        {this.props.children}
      </div>
    );
  }
}
