import * as React from 'react';
import * as PropTypes from 'prop-types';
import OlView from 'ol/View';
import OlProjection from 'ol/proj/Projection';

export interface IViewProps {
  /**
   * Center.
   */
  center?: [number, number];
  /*
   * Zoom.
   */
  zoom?: number;
  /*
   * Resolution.
   */
  resolution?: number;
  /*
   * Rotation.
   */
  rotation?: number;
  /*
   * Projection.
   */
  olProjection?: OlProjection | string;
}

export class View extends React.Component<IViewProps, any> {
  public static contextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: PropTypes.object
  };

  public componentDidMount() {
    const view = new OlView({
      center: this.props.center,
      zoom: this.props.zoom,
      resolution: this.props.resolution,
      rotation: this.props.rotation,
      projection: this.props.olProjection
    });
    this.context.olMap.setView(view);
  }

  public render(): any {
    return null;
  }
}
