import * as React from 'react';
import OlMap from 'ol/Map';
import OlProjection from 'ol/proj/Projection';
export interface IViewProps {
  /**
   * Center.
   */
  center?: [number, number];
  zoom?: number;
  resolution?: number;
  rotation?: number;
  projection?: OlProjection | string;
}
export declare class View extends React.Component<IViewProps, any> {
  static contextTypes: {
    /**
     * OpenLayers map.
     */
    olMap: typeof OlMap;
  };
  componentDidMount(): void;
  render(): any;
}
