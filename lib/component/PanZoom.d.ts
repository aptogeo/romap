import * as React from 'react';
import OlMap from 'ol/Map';
export interface IPanZoomProps {
  /**
   * Class name.
   */
  className?: string;
  /**
   * Show Zoom
   */
  showZoom?: boolean;
  /**
   * Show Pan
   */
  showPan?: boolean;
  /**
   * Show Rotation
   */
  showRotation?: boolean;
  /**
   * Internationalization
   */
  i18n?: {
    [key: string]: string;
  };
}
export declare class PanZoom extends React.Component<IPanZoomProps, any> {
  static defaultProps: {
    className: string;
    showZoom: boolean;
    showPan: boolean;
    showRotation: boolean;
  };
  static contextTypes: {
    /**
     * OpenLayers map.
     */
    olMap: typeof OlMap;
  };
  /**
   * Origin.
   */
  private origin;
  /**
   * Button Rotate.
   */
  private buttonRotate;
  /**
   * Span Rotate.
   */
  private spanRotate;
  componentDidMount(): void;
  handleZoom(event: any): void;
  handleUnzoom(event: any): void;
  handleOrigin(event: any): void;
  handleLeft(event: any): void;
  handleRight(event: any): void;
  handleUp(event: any): void;
  handleDown(event: any): void;
  pan(deltaX: number, deltaY: number): void;
  zoom(delta: number): void;
  handleResetRotation(): void;
  renderPan(): any;
  renderZoom(): any;
  renderRotation(): any;
  render(): any;
}
