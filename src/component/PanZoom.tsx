import * as React from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { easeOut } from 'ol/easing';
import { cloneView } from '../utils';

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
   * Show Zoom Slider
   */
  showZoomSlider?: boolean;
  /**
   * Show Pan
   */
  showPan?: boolean;
  /**
   * Show Origin
   */
  showOrigin?: boolean;
  /**
   * Show Rotation
   */
  showRotation?: boolean;
  /**
   * Internationalization
   */
  i18n?: { [key: string]: string };
}

export class PanZoom extends React.Component<IPanZoomProps, any> {
  public static defaultProps = {
    className: 'panzoom',
    showZoom: true,
    showZoomSlider: true,
    showPan: true,
    showOrigin: true,
    showRotation: true
  };

  public static contextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: OlMap
  };

  /**
   * Origin.
   */
  private origin: OlView;

  /**
   * Button Rotate.
   */
  private buttonRotate: any;

  /**
   * Span Rotate.
   */
  private spanRotate: any;

  public componentDidMount() {
    setTimeout(() => {
      this.origin = cloneView(this.context.olMap.getView());
    }, 300);
    this.context.olMap.on('postrender', (event: any) => {
      const frameState = event.frameState;
      if (frameState == null) {
        return;
      }
      const viewState = frameState.viewState;
      if (viewState == null) {
        return;
      }
      const rotation = viewState.rotation;
      if (rotation != null && rotation !== 0) {
        this.buttonRotate.style.display = '';
        const transform = 'rotate(' + rotation + 'rad)';
        this.spanRotate.style.msTransform = transform;
        this.spanRotate.style.webkitTransform = transform;
        this.spanRotate.style.transform = transform;
      } else {
        this.buttonRotate.style.display = 'none';
      }
    });
  }

  public handleZoom(event: any) {
    this.zoom(1);
  }

  public handleUnzoom(event: any) {
    this.zoom(-1);
  }

  public handleOrigin(event: any) {
    if (this.origin) {
      this.context.olMap.setView(cloneView(this.origin));
    }
  }

  public handleLeft(event: any) {
    this.handleResetRotation();
    this.pan(-128, 0);
  }

  public handleRight(event: any) {
    this.handleResetRotation();
    this.pan(128, 0);
  }

  public handleUp(event: any) {
    this.handleResetRotation();
    this.pan(0, 128);
  }

  public handleDown(event: any) {
    this.handleResetRotation();
    this.pan(0, -128);
  }

  public pan(deltaX: number, deltaY: number) {
    const view = this.context.olMap.getView();
    const res = view.getResolution();
    const center = view.getCenter();
    center[0] += res * deltaX;
    center[1] += res * deltaY;
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    view.animate({
      center,
      duration: 200,
      easing: easeOut
    });
  }

  public zoom(delta: number) {
    const view = this.context.olMap.getView();
    const res = view.getResolution();
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    view.animate({
      resolution: view.constrainResolution(res, delta),
      duration: 200,
      easing: easeOut
    });
  }

  public handleResetRotation() {
    const view = this.context.olMap.getView();
    if (view.getRotation() !== undefined) {
      view.animate({
        rotation: 0,
        duration: 200,
        easing: easeOut
      });
    }
  }

  public renderPan(): any {
    if (!this.props.showPan) {
      return null;
    }
    const { i18n } = this.props;
    const upTitle = i18n && i18n.upTitle ? i18n.upTitle : 'Pan up';
    const downTitle = i18n && i18n.downTitle ? i18n.downTitle : 'Pan down';
    const rightTitle = i18n && i18n.rightTitle ? i18n.rightTitle : 'Pan right';
    const leftTitle = i18n && i18n.leftTitle ? i18n.leftTitle : 'Pan left';
    const originTitle = i18n && i18n.originTitle ? i18n.originTitle : 'Zoom origin';
    let origin = null;
    if (this.props.showOrigin) {
      origin = (
        <button
          className={`${this.props.className}-origin`}
          onClick={this.handleOrigin.bind(this)}
          title={originTitle}
        />
      );
    } else {
      origin = <button className={`${this.props.className}-noorigin`} disabled />;
    }
    return (
      <div>
        <button className={`${this.props.className}-up`} onClick={this.handleUp.bind(this)} title={upTitle} />
        <button className={`${this.props.className}-left`} onClick={this.handleLeft.bind(this)} title={leftTitle} />
        {origin}
        <button className={`${this.props.className}-right`} onClick={this.handleRight.bind(this)} title={rightTitle} />
        <button className={`${this.props.className}-down`} onClick={this.handleDown.bind(this)} title={downTitle} />
      </div>
    );
  }

  public renderZoom(): any {
    if (!this.props.showZoom) {
      return null;
    }
    const { i18n } = this.props;
    const zoomTitle = i18n && i18n.zoomTitle ? i18n.zoomTitle : 'Zoom in';
    const unzoomTitle = i18n && i18n.unzoomTitle ? i18n.unzoomTitle : 'Zoom out';
    let slider = null;
    if (this.props.showZoomSlider) {
      slider = (
        <div className={`${this.props.className}-zoom-slider`}>
          <button className={`${this.props.className}-zoom-slider-thumb`} />
        </div>
      );
    }
    return (
      <div>
        <button className={`${this.props.className}-zoom`} onClick={this.handleZoom.bind(this)} title={zoomTitle} />
        {slider}
        <button
          className={`${this.props.className}-unzoom`}
          onClick={this.handleUnzoom.bind(this)}
          title={unzoomTitle}
        />
      </div>
    );
  }

  public renderRotation(): any {
    if (!this.props.showRotation) {
      return null;
    }
    const { i18n } = this.props;
    const rotateTitle = i18n && i18n.rotateTitle ? i18n.rotateTitle : 'Set map orientation to north up';
    return (
      <div>
        <button
          ref={buttonRotate => {
            this.buttonRotate = buttonRotate;
          }}
          className={`${this.props.className}-rotate`}
          onClick={this.handleResetRotation.bind(this)}
          title={rotateTitle}
        >
          <span
            ref={spanRotate => {
              this.spanRotate = spanRotate;
            }}
            className={`${this.props.className}-span-rotate`}
          />
        </button>
      </div>
    );
  }

  public render(): any {
    return (
      <div className={`${this.props.className} ol-unselectable ol-control`}>
        {this.renderPan()}
        {this.renderZoom()}
        {this.renderRotation()}
      </div>
    );
  }
}
