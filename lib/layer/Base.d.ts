import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
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
export declare class Base<P extends IBaseProps, S> extends React.Component<P, S> {
  static contextTypes: {
    /**
     * OpenLayers map.
     */
    olMap: typeof OlMap;
    /**
     * OpenLayers group.
     */
    olGroup: typeof GroupLayer;
  };
  id: string;
  data: any;
  type: string;
  visible: boolean;
  opacity: number;
  extent: number[];
  order: number;
  zIndex: number;
  private olLayer;
  componentWillMount(): void;
  componentDidMount(): void;
  shouldComponentUpdate(nextProps: P): boolean;
  componentWillUpdate(nextProps: P): void;
  componentWillUnmount(): void;
  createOlLayer(): BaseLayer;
  checkProps(props: P): void;
  internalRemoveEvents(): void;
  internalAddEvents(): void;
  getOlLayer(): any;
  getOlSource(): any;
  setOlSource(olSource: any): any;
  setId(id: string): void;
  setData(data: any): void;
  setType(type: string): void;
  setOrder(order: number): void;
  setOpacity(opacity: number): void;
  setVisible(visible: boolean): void;
  setExtent(extent: number[]): void;
  render(): any;
  private handleLoadstart;
  private handleLoadend;
  private handleLoaderror;
  private handleBaseLayerPropertychange;
}
