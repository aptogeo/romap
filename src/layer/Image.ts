import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import ImageLayer from 'ol/layer/Image';
import { Base, IBaseProps } from './Base';

export interface IImageProps extends IBaseProps {
  /**
   * Source.
   */
  source: any;
}

export class Image extends Base<IImageProps, any> {
  public createOlLayer(): BaseLayer {
    return new ImageLayer({ source: this.props.source });
  }
}
