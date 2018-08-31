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
  public source: any;

  public createOlLayer(): BaseLayer {
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
