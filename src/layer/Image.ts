import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import ImageLayer from 'ol/layer/Image';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IImageProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: ol.source.Image;
}

export class Image extends BaseLayer<IImageProps, any> {
  public source: ol.source.Image;

  public createOlLayer(): OlBaseLayer {
    return new ImageLayer();
  }

  public checkProps(props: IImageProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: any) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
