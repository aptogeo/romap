import * as React from 'react';
import OlView from 'ol/View';
import OlProjection from 'ol/proj/Projection';
import { mapContext } from './MapContext';

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
  projection?: OlProjection | string;
}

export class View extends React.Component<IViewProps, any> {
  public static contextType = mapContext;

  public componentDidMount() {
    const view = new OlView({
      center: this.props.center,
      zoom: this.props.zoom,
      resolution: this.props.resolution,
      rotation: this.props.rotation,
      projection: this.props.projection
    });
    this.context.olMap.setView(view);
  }

  public render(): React.ReactNode {
    return null;
  }
}
