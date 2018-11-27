import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlSource from 'ol/source/Source';
import { isBoolean, isFinite, isInteger, isEqual } from 'lodash';
import { walk } from '../utils';
import { mapContext } from '../MapContext';

interface Data {
  [key: string]: any;
}

let globalOrder = 0;

export interface IBaseLayerProps {
  /**
   * Id.
   */
  id?: string;
  /**
   * Name.
   */
  name?: string;
  /**
   * Additional data.
   */
  data?: Data;
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
   * Default visible.
   */
  visible?: boolean;
  /**
   * Default opacity.
   */
  opacity?: number;
}

export class BaseLayer<P extends IBaseLayerProps, S, L extends OlBaseLayer, SC extends OlSource> extends React.Component<P, S> {
  public static contextType = mapContext;

  public id: string;

  public name: string;

  public data: Data;

  public type: string;

  public visible: boolean;

  public opacity: number;

  public extent: [number, number, number, number];

  public order: number;

  public zIndex: number;

  private olLayer: L = null;

  public componentDidMount() {
    this.olLayer = this.createOlLayer();
    this.checkProps(this.props);
    // Add OlLayer to map
    if (this.type === 'BASE') {
      this.context.olMap.addLayer(this.olLayer);
    } else {
      this.context.olGroup.getLayers().push(this.olLayer);
    }
    // Activate events
    this.internalAddEvents();
  }

  public shouldComponentUpdate(nextProps: P) {
    // Optimisation: check if props are changed
    if (isEqual(nextProps, this.props)) {
      return false;
    }
    this.checkProps(nextProps);
    return true;
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

  public createOlLayer(): L {
    return null;
  }

  public checkProps(props: P) {
    this.setId(props.id);
    this.setName(props.name);
    this.setData(props.data);
    this.setType(props.type);
    this.setVisible(props.visible);
    this.setOpacity(props.opacity);
    this.setExtent(props.extent);
    this.setOrder(props.order);
  }

  public internalRemoveEvents() {
    // Unwatch events on layer
    this.olLayer.un('propertychange', this.handleBaseLayerPropertychange);
  }

  public internalAddEvents() {
    // Watch events on layer
    this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
  }

  public getOlLayer(): L {
    return this.olLayer;
  }

  public getOlSource(): SC {
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

  public setId(id: string) {
    this.id = id;
    this.olLayer.set('id', this.id);
  }

  public setName(name: string) {
    this.name = name;
    this.olLayer.set('name', this.name);
  }

  public setData(data: any) {
    this.data = data;
    this.olLayer.set('data', this.data);
  }

  public setType(type: string) {
    this.type = type;
    if (this.type == null || (this.type !== 'BASE' && this.type !== 'OVERLAY')) {
      this.type = 'OVERLAY';
    }
    this.olLayer.set('type', this.type);
  }

  public setOrder(order: number) {
    this.order = null;
    if (isInteger(order)) {
      this.order = order;
    }
    if (this.order == null || this.order < 0) {
      this.order = globalOrder + 1;
    }
    if (this.order > globalOrder) {
      globalOrder = this.order;
    }
    this.zIndex = this.order;
    if (this.type === 'OVERLAY') {
      this.zIndex += 10000;
    }
    this.olLayer.set('order', this.order);
    this.olLayer.setZIndex(this.zIndex);
  }

  public setOpacity(opacity: number) {
    this.opacity = null;
    if (isFinite(opacity)) {
      this.opacity = opacity;
    }
    if (this.opacity == null || (this.opacity < 0 && this.opacity > 1)) {
      this.opacity = 1;
    }
    this.olLayer.setOpacity(this.opacity);
  }

  public setVisible(visible: boolean) {
    this.visible = null;
    if (isBoolean(visible)) {
      this.visible = visible;
    }
    if (this.visible == null) {
      this.visible = true;
    }
    this.olLayer.setVisible(this.visible);
  }

  public setExtent(extent: [number, number, number, number]) {
    this.extent = extent;
    if (this.extent == null) {
      this.extent = undefined;
    }
    this.olLayer.setExtent(this.extent);
  }

  private handleBaseLayerPropertychange = (event: any) => {
    const key = event.key;
    const value = event.target.get(key);
    const obj: any = this;
    if (key !== 'zIndex') {
      obj[key] = value;
    }
    if (key === 'visible') {
      if (value === true && this.type === 'BASE') {
        walk(this.context.olMap, (currentOlLayer: any) => {
          if (currentOlLayer.get('type') === 'BASE' && currentOlLayer !== this.olLayer) {
            currentOlLayer.setVisible(false);
          }
          return true;
        });
      }
    }
  };

  public render(): any {
    return null;
  }
}
