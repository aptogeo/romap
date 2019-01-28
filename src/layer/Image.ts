import * as React from 'react';
import OlImageLayer from 'ol/layer/Image';
import OlImageSource from 'ol/source/Image';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IImageProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlImageSource;
}

export class Image extends BaseLayer<IImageProps, {}, OlImageLayer, OlImageSource> {
  public createOlLayer(): OlImageLayer {
    return new OlImageLayer();
  }

  public updateProps(prevProps: IImageProps, nextProps: IImageProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps == null || prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
  }

  public setSource(source: OlImageSource) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
