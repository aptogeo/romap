import * as React from 'react';
import OlView from 'ol/View';
import { easingOut } from 'ol/easing';
import { cloneView } from '../utils';
import { IMapContext } from '../Map'


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
    olMap: (): any => null,
    olGroup: (): any => null
  };

  public context: IMapContext;

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

  /**
   * Container thumb.
   */
  private containerThumb: any;

  /**
   * Btn thumb.
   */
  private btnThumb: any;

  public componentDidMount() {
    setTimeout(() => {
      this.origin = cloneView(this.context.olMap.getView());
      this.onViewChange();
    }, 100);
    this.context.olMap.on('change:view', this.onViewChange);
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

  public onViewChange = () => {
    this.context.olMap.getView().on('propertychange', this.onResolutionChange);
    this.onResolutionChange();
  };

  public onResolutionChange = () => {
    if (this.btnThumb == null) {
      return;
    }
    const view = this.context.olMap.getView();
    const resolution = view.getResolution();
    const position = 1 - (view as any).getValueForResolutionFunction()(resolution);
    const computedBtnThumbStyle = window.getComputedStyle(this.btnThumb);
    const btnThumbHeight =
      this.btnThumb.offsetHeight +
      parseFloat(computedBtnThumbStyle['marginTop']) +
      parseFloat(computedBtnThumbStyle['marginBottom']) +
      1;
    this.btnThumb.style.top = (this.containerThumb.offsetHeight - btnThumbHeight) * position - btnThumbHeight + 'px';
  };

  public handleZoom = () => {
    this.zoom(1);
  };

  public handleUnzoom = () => {
    this.zoom(-1);
  };

  public handleOrigin = () => {
    if (this.origin) {
      this.context.olMap.setView(cloneView(this.origin));
    }
  };

  public handleLeft = () => {
    this.handleResetRotation();
    this.pan(-128, 0);
  };

  public handleRight = () => {
    this.handleResetRotation();
    this.pan(128, 0);
  };

  public handleUp = () => {
    this.handleResetRotation();
    this.pan(0, 128);
  };

  public handleDown = () => {
    this.handleResetRotation();
    this.pan(0, -128);
  };

  public handleResetRotation = () => {
    const view = this.context.olMap.getView();
    if (view.getRotation() !== undefined) {
      view.animate({
        rotation: 0,
        duration: 200,
        easing: easingOut
      });
    }
  };

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
      easing: easingOut
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
      easing: easingOut
    });
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
      origin = <button className={`${this.props.className}-origin`} onClick={this.handleOrigin} title={originTitle} />;
    } else {
      origin = <button className={`${this.props.className}-noorigin`} disabled />;
    }
    return (
      <div>
        <button className={`${this.props.className}-up`} onClick={this.handleUp} title={upTitle} />
        <button className={`${this.props.className}-left`} onClick={this.handleLeft} title={leftTitle} />
        {origin}
        <button className={`${this.props.className}-right`} onClick={this.handleRight} title={rightTitle} />
        <button className={`${this.props.className}-down`} onClick={this.handleDown} title={downTitle} />
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
        <div
          ref={containerThumb => {
            this.containerThumb = containerThumb;
          }}
          className={`${this.props.className}-zoom-slider`}
        >
          <button
            ref={btnThumb => {
              this.btnThumb = btnThumb;
            }}
            className={`${this.props.className}-zoom-slider-thumb`}
          />
        </div>
      );
    }
    return (
      <div>
        <button className={`${this.props.className}-zoom`} onClick={this.handleZoom} title={zoomTitle} />
        {slider}
        <button className={`${this.props.className}-unzoom`} onClick={this.handleUnzoom} title={unzoomTitle} />
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
          onClick={this.handleResetRotation}
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
