import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlHeatmapLayer from 'ol/layer/Heatmap';
import OlVectorSource from 'ol/source/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IHeatmapProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlVectorSource;
  /**
   * Gradient.
   */
  gradient: string[];
  /**
   * Radius.
   */
  radius: number;
  /**
   * Blur.
   */
  blur: number;
  /**
   * Shadow.
   */
  shadow: number;
  /**
   * Weight.
   */
  weight: string;
  /**
   * Render mode.
   */
  renderMode: string;
}

export class Heatmap extends BaseLayer<IHeatmapProps, {}, OlHeatmapLayer, OlVectorSource> {
  public source: OlVectorSource;
  public gradient: string[];
  public radius: number;
  public blur: number;
  public shadow: number;
  public weight: string;
  public renderMode: string;

  public createOlLayer(): OlHeatmapLayer {
    return new OlHeatmapLayer();
  }

  public checkProps(props: IHeatmapProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: OlVectorSource) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setGradient(gradient: string[]) {
    this.gradient = gradient;
    if (this.gradient == null) {
      this.gradient = undefined;
    }
    this.getOlLayer().setGradient(gradient);
  }

  public setRadius(radius: number) {
    this.radius = radius;
    if (this.radius == null) {
      this.radius = undefined;
    }
    this.getOlLayer().setRadius(radius);
  }

  public setBlur(blur: number) {
    this.blur = blur;
    if (this.blur == null) {
      this.blur = undefined;
    }
    this.getOlLayer().setBlur(blur);
  }

  public setShadow(shadow: number) {
    this.shadow = shadow;
    if (this.shadow == null) {
      this.shadow = undefined;
    }
    this.getOlLayer().setShadow(shadow);
  }

  public setWeight(weight: string) {
    this.weight = weight;
    if (this.weight == null) {
      this.weight = undefined;
    }
    this.getOlLayer().setWeight(weight);
  }

  public setRenderMode(renderMode: string) {
    this.renderMode = renderMode;
    if (this.renderMode == null) {
      this.renderMode = undefined;
    }
    this.getOlLayer().setRenderMode(renderMode);
  }
}
