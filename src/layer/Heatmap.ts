import * as React from 'react';
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
  public createOlLayer(): OlHeatmapLayer {
    return new OlHeatmapLayer();
  }

  public updateProps(prevProps: IHeatmapProps, nextProps: IHeatmapProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps == null || prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
  }

  public setSource(source: OlVectorSource) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setGradient(gradient: string[]) {
    if (gradient == null) {
      gradient = undefined;
    }
    this.getOlLayer().setGradient(gradient);
  }

  public setRadius(radius: number) {
    if (radius == null) {
      radius = undefined;
    }
    this.getOlLayer().setRadius(radius);
  }

  public setBlur(blur: number) {
    if (blur == null) {
      blur = undefined;
    }
    this.getOlLayer().setBlur(blur);
  }

  public setShadow(shadow: number) {
    if (shadow == null) {
      shadow = undefined;
    }
    this.getOlLayer().setShadow(shadow);
  }

  public setWeight(weight: string) {
    if (weight == null) {
      weight = undefined;
    }
    this.getOlLayer().setWeight(weight);
  }

  public setRenderMode(renderMode: string) {
    if (renderMode == null) {
      renderMode = undefined;
    }
    this.getOlLayer().setRenderMode(renderMode);
  }
}
