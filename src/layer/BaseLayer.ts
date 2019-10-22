import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlSource from 'ol/source/Source';
import { ObjectEvent } from 'ol/Object';
import { walk } from '../utils';
import { romapContext, IRomapContext } from '../RomapContext';
import { jsonEqual } from '../utils';
import { IExtended } from '../source';

let globalOrder = 0;

export interface IBaseLayerProps {
  /**
   * unique id is mandatory.
   */
  uid: React.Key;
  /**
   * Name.
   */
  name?: string;
  /**
   * type: BASE or OVERLAY.
   */
  type?: string;
  /**
   * Extent.
   */
  extent?: [number, number, number, number];
  /**
   * Order position.
   */
  order?: number;
  /**
   * Visible.
   */
  visible?: boolean;
  /**
   * Opacity.
   */
  opacity?: number;
  /**
   * Source.
   */
  source?: IExtended;
}

export class BaseLayer<
  P extends IBaseLayerProps,
  S,
  OLL extends OlBaseLayer,
  OLS extends OlSource
  > extends React.Component<P, S> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public static defaultProps = {
    type: 'OVERLAY'
  };

  public context: IRomapContext;

  private olLayer: OLL = null;

  public componentDidMount() {
    this.olLayer = this.context.layersManager.getOlLayer(this.props.uid) as OLL;
    if (this.olLayer == null) {
      this.olLayer = this.createOlLayer();
    }
    this.context.layersManager.setOlLayer(this.props.uid, this.olLayer);
    this.updateProps(null, this.props);
    // Add OlLayer to map
    if (this.props.type === 'BASE') {
      this.context.olMap.addLayer(this.olLayer);
    } else {
      this.context.olGroup.getLayers().push(this.olLayer);
    }
    // Activate events
    this.internalAddEvents();
  }

  public componentDidUpdate(prevProps: P, prevState: S, snapshot: any) {
    this.updateProps(prevProps, this.props);
  }

  public componentWillUnmount() {
    // Remove events
    this.internalRemoveEvents();
    // Remove OlLayer to map
    walk(this.context.olMap, (currentOlLayer, idx, parent) => {
      if (currentOlLayer === this.olLayer) {
        parent.getLayers().remove(this.olLayer);
      }
      return true;
    });
    this.context.olMap.removeLayer(this.olLayer);
  }

  public createOlLayer(): OLL {
    return null;
  }

  public updateProps(prevProps: P, nextProps: P) {
    let props = {};
    if (prevProps == null || prevProps.name !== nextProps.name) {
      this.olLayer.set('name', nextProps.name);
      props = { ...props, name: nextProps.name };
    }
    if (prevProps == null || prevProps.type !== nextProps.type) {
      let type = nextProps.type;
      if (type !== 'BASE' && type !== 'OVERLAY') {
        type = 'OVERLAY';
      }
      this.olLayer.set('type', nextProps.type);
      props = { ...props, type };
    }
    if (prevProps == null || prevProps.visible !== nextProps.visible) {
      let visible = nextProps.visible;
      if (visible == null) {
        if (nextProps.type === 'BASE') {
          visible = false;
        } else {
          visible = true;
        }
      }
      this.olLayer.setVisible(visible);
      props = { ...props, visible };
    }
    if (prevProps == null || prevProps.opacity !== nextProps.opacity) {
      let opacity = nextProps.opacity;
      if (opacity !== +opacity) {
        opacity = 1;
      }
      if (opacity < 0 && opacity > 1) {
        opacity = 1;
      }
      this.olLayer.setOpacity(opacity);
      props = { ...props, opacity };
    }
    if (prevProps == null || !jsonEqual(prevProps.extent, nextProps.extent)) {
      let extent = nextProps.extent;
      if (extent == null) {
        extent = undefined;
      }
      this.olLayer.setExtent(extent);
      props = { ...props, extent };
    }
    if (prevProps == null || prevProps.order !== nextProps.order || prevProps.type !== nextProps.type) {
      let order = nextProps.order;
      if (order == null || order == NaN || order < 0) {
        order = globalOrder + 1;
      }
      if (order > globalOrder) {
        globalOrder = order;
      }
      let zIndex = order;
      if (nextProps.type === 'OVERLAY') {
        zIndex += 10000;
      }
      this.olLayer.set('order', order);
      this.olLayer.setZIndex(zIndex);
      props = { ...props, order };
    }
    if (Object.entries(props).length > 0) {
      this.context.layersManager.updateLayerProps(this.props.uid, props);
    }
  }

  public internalRemoveEvents() {
    // Unwatch events on layer
    this.olLayer.un('propertychange', this.handleBaseLayerPropertychange);
  }

  public internalAddEvents() {
    // Watch events on layer
    this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
  }

  public getOlLayer(): OLL {
    return this.olLayer;
  }

  public getOlSource(): OLS {
    if ('getSource' in this.olLayer) {
      return (this.olLayer as any).getSource();
    }
    return null;
  }

  public setOlSource(olSource: any): any {
    if ('setSource' in this.olLayer) {
      return (this.olLayer as any).setSource(olSource);
    }
  }

  private handleBaseLayerPropertychange = (event: ObjectEvent) => {
    const key = event.key;
    const value = event.target.get(key);
    if (key === 'visible' && value === true && this.props.type === 'BASE') {
      this.context.layersManager
        .getLayerElements(layerElement => {
          const props = layerElement.reactElement.props;
          return props.type === 'BASE' && props.visible === true && layerElement.uid !== this.props.uid;
        })
        .forEach(layerElement => {
          this.context.layersManager.updateLayerProps(layerElement.uid, { visible: false });
        });
    }
  };

  public render(): React.ReactNode {
    return null;
  }
}
