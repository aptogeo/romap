import * as React from 'react';
import OlMap from 'ol/Map';
import { getPointResolution } from 'ol/proj';

const LEADING_DIGITS = [1, 2, 5];

export interface IScaleLineProps {
  /**
   * Class name.
   */
  className?: string;
  /**
   * Min Width name.
   */
  minWidth?: number;
  /**
   * Internationalization
   */
  i18n?: { [key: string]: string };
}

export class ScaleLine extends React.Component<IScaleLineProps, any> {
  public static defaultProps = {
    className: 'scaleline',
    minWidth: 64
  };

  public static contextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: OlMap
  };

  /**
   * Div ScaleLine.
   */
  private divScaleLine: any;

  /**
   * Div ScaleLine Inner.
   */
  private divScaleLineInner: any;

  /**
   * Div ScaleLine Label.
   */
  private divScaleLineLabel: any;

  public componentDidMount() {
    this.context.olMap.on('change:view', this.onViewChange);
    this.onViewChange();
  }

  public onViewChange = () => {
    this.context.olMap.getView().on('propertychange', this.onResolutionChange);
    this.onResolutionChange();
  };

  public onResolutionChange = () => {
    const view = this.context.olMap.getView();
    if (view == null) {
      return;
    }
    const projection = view.getProjection();
    const units = projection.getUnits();
    const center = view.getCenter();
    const resolution = view.getResolution();

    let pointResolution = getPointResolution(projection, resolution, center, 'm');

    const nominalCount = this.props.minWidth * pointResolution;
    let suffix = '';
    if (units === 'm' || units === 'degrees') {
      if (nominalCount < 0.001) {
        suffix = 'μm';
        pointResolution *= 1000000;
      } else if (nominalCount < 1) {
        suffix = 'mm';
        pointResolution *= 1000;
      } else if (nominalCount < 1000) {
        suffix = 'm';
      } else {
        suffix = 'km';
        pointResolution /= 1000;
      }
    } else if (units === 'ft' || units === 'us-ft') {
      if (nominalCount < 0.9144) {
        suffix = 'in';
        pointResolution *= 39.37;
      } else if (nominalCount < 1609.344) {
        suffix = 'ft';
        pointResolution /= 0.30480061;
      } else {
        suffix = 'mi';
        pointResolution /= 1609.3472;
      }
    } else {
      return;
    }

    let i = 3 * Math.floor(Math.log(this.props.minWidth * pointResolution) / Math.log(10));
    let count;
    let width;
    while (true) {
      count = LEADING_DIGITS[((i % 3) + 3) % 3] * Math.pow(10, Math.floor(i / 3));
      width = Math.round(count / pointResolution);
      if (isNaN(width)) {
        this.divScaleLine.style.display = 'none';
        return;
      } else if (width >= this.props.minWidth) {
        break;
      }
      ++i;
    }

    this.divScaleLine.style.display = '';

    const label = count + ' ' + suffix;
    this.divScaleLineLabel.innerHTML = label;

    this.divScaleLineInner.style.width = width + 'px';
  };

  public componentWillUnmount() {
    this.context.olMap.getView().un('propertychange', this.onResolutionChange);
    this.context.olMap.un('change:view', this.onViewChange);
  }

  public render(): any {
    const { i18n } = this.props;
    const scanlineTitle = i18n && i18n.scanlineTitle ? i18n.scanlineTitle : 'Diagonal distance in map center';
    return (
      <div
        ref={divScaleLine => {
          this.divScaleLine = divScaleLine;
        }}
        className={`${this.props.className}  ol-unselectable ol-control`}
        title={scanlineTitle}
      >
        <div
          ref={divScaleLineInner => {
            this.divScaleLineInner = divScaleLineInner;
          }}
          className={`${this.props.className}-inner`}
        >
          <div className={`${this.props.className}-parts`}>
            <div className={`${this.props.className}-part1`} />
            <div className={`${this.props.className}-part2`} />
          </div>
        </div>
        <div
          ref={divScaleLineLabel => {
            this.divScaleLineLabel = divScaleLineLabel;
          }}
          className={`${this.props.className}-label`}
        />
      </div>
    );
  }
}
