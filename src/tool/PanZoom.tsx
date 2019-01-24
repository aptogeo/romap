import * as React from 'react';
import OlView from 'ol/View';
import { inAndOut } from 'ol/easing';
import { cloneView } from '../utils';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

export interface IPanZoomProps extends IBaseToolProps {
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
}

export class PanZoom extends BaseTool<IPanZoomProps, any> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public static defaultProps = {
    className: 'panzoom',
    showZoom: true,
    showZoomSlider: true,
    showPan: true,
    showOrigin: true,
    showRotation: true
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
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      view.animate({
        rotation: 0,
        duration: 200,
        easing: inAndOut
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
      easing: inAndOut
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
      easing: inAndOut
    });
  }

  public renderPan(): any {
    if (!this.props.showPan) {
      return null;
    }
    const upTitle = this.context.getLocalizedText('upTitle', 'Pan up');
    const downTitle = this.context.getLocalizedText('downTitle', 'Pan down');
    const rightTitle = this.context.getLocalizedText('rightTitle', 'Pan right');
    const leftTitle = this.context.getLocalizedText('leftTitle', 'Pan left');
    const originTitle = this.context.getLocalizedText('originTitle', 'Zoom origin');
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
    const zoomTitle = this.context.getLocalizedText('zoomTitle', 'Zoom in');
    const unzoomTitle = this.context.getLocalizedText('unzoomTitle', 'Zoom out');
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
    const rotateTitle = this.context.getLocalizedText('rotateTitle', 'Set map orientation to north up');
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

  public render(): React.ReactNode {
    if (this.props.disable === true) {
      return null;
    }
    return (
      <div className={`${this.props.className} ol-unselectable ol-control`}>
        {this.renderPan()}
        {this.renderZoom()}
        {this.renderRotation()}
      </div>
    );
  }
}
