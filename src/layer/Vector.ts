import * as React from 'react';
import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IVectorProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlVectorSource;
  /**
   * Style.
   */
  style?: any;
}

export class Vector extends BaseLayer<IVectorProps, {}, OlVectorLayer, OlVectorSource> {
  public createOlLayer(): OlVectorLayer {
    return new OlVectorLayer();
  }

  public updateProps(prevProps: IVectorProps, nextProps: IVectorProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps == null || prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
    if (prevProps == null || prevProps.style != nextProps.style) {
      this.setStyle(nextProps.style);
    }
  }

  public setSource(source: OlVectorSource) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setStyle(style: any) {
    if (style == null) {
      style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
