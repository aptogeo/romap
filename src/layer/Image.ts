import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
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
  public source: OlImageSource;

  public createOlLayer(): OlImageLayer {
    return new OlImageLayer();
  }

  public checkProps(props: IImageProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: OlImageSource) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
