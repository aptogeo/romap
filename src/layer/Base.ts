import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import { isBoolean, isFinite, isInteger, isEqual } from 'lodash';
import { walk } from '../utils';

let globalOrder = 0;

export interface IBaseProps {
  /**
   * Id.
   */
  id?: string;
  /**
   * Any additional datas.
   */
  data?: any;
  /**
   * type: BASE or OVERLAY.
   */
  type?: string;
  /**
   * Extent.
   */
  extent?: number[];
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

export class Base<P extends IBaseProps, S> extends React.Component<P, S> {
  public static contextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: OlMap,
    /**
     * OpenLayers group.
     */
    olGroup: GroupLayer
  };

  public id: string;

  public data: any;

  public type: string;

  public visible: boolean;

  public opacity: number;

  public extent: number[];

  public order: number;

  public zIndex: number;

  private olLayer: any = null;

  public componentWillMount() {
    this.olLayer = this.createOlLayer();
    this.checkProps(this.props);
  }

  public componentDidMount() {
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
    return true;
  }

  public componentWillUpdate(nextProps: P) {
    this.checkProps(nextProps);
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

  public createOlLayer(): BaseLayer {
    return new BaseLayer({});
  }

  public checkProps(props: P) {
    this.setId(props.id);
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
    this.olLayer.un('precompose', this.handleLoadstart);
    this.olLayer.un('postcompose', this.handleLoadend);
    if ('getSource' in this.olLayer && this.olLayer.getSource()) {
      // Unwatch events on source
      this.olLayer.getSource().un('tileloadstart', this.handleLoadstart);
      this.olLayer.getSource().un('tileloadend', this.handleLoadend);
      this.olLayer.getSource().un('tileloaderror', this.handleLoaderror);
      this.olLayer.getSource().un('imageloadstart', this.handleLoadstart);
      this.olLayer.getSource().un('imageloadend', this.handleLoadend);
      this.olLayer.getSource().un('imageloaderror', this.handleLoaderror);
    }
  }

  public internalAddEvents() {
    // Watch events on layer
    this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
    this.olLayer.on('precompose', this.handleLoadstart);
    this.olLayer.on('postcompose', this.handleLoadend);
    if ('getSource' in this.olLayer && this.olLayer.getSource()) {
      // Watch events on source
      this.olLayer.getSource().on('tileloadstart', this.handleLoadstart);
      this.olLayer.getSource().on('tileloadend', this.handleLoadend);
      this.olLayer.getSource().on('tileloaderror', this.handleLoaderror);
      this.olLayer.getSource().on('imageloadstart', this.handleLoadstart);
      this.olLayer.getSource().on('imageloadend', this.handleLoadend);
      this.olLayer.getSource().on('imageloaderror', this.handleLoaderror);
    }
  }

  public getOlLayer(): any {
    return this.olLayer;
  }

  public getOlSource(): any {
    if ('getSource' in this.olLayer) {
      return this.olLayer.getSource();
    }
    return null;
  }

  public setOlSource(olSource: any): any {
    if ('getSource' in this.olLayer) {
      return this.olLayer.setSource(olSource);
    }
  }

  public setId(id: string) {
    this.id = id;
    this.olLayer.set('id', this.id);
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

  public setExtent(extent: number[]) {
    this.extent = extent;
    if (this.extent == null) {
      this.extent = undefined;
    }
    this.olLayer.setExtent(this.extent);
  }

  public render(): any {
    return null;
  }

  private handleLoadstart = () => {
    this.context.olMap.increaseLoadingCounter();
  };

  private handleLoadend = () => {
    this.context.olMap.decreaseLoadingCounter();
  };

  private handleLoaderror = () => {
    this.context.olMap.decreaseLoadingCounter();
  };

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
}
