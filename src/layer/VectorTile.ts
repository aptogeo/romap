import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import VectorTileLayer from 'ol/layer/VectorTile';
import { Base, IBaseProps } from './Base';

export interface IVectorTileProps extends IBaseProps {
  /**
   * Source.
   */
  source: any;
  /**
   * Style.
   */
  style?: any;
}

export class VectorTile extends Base<IVectorTileProps, any> {
  public source: any;

  public style: any;

  public createOlLayer(): BaseLayer {
    return new VectorTileLayer();
  }

  public checkProps(props: IVectorTileProps) {
    super.checkProps(props);
    this.setSource(props.source);
    this.setStyle(props.style);
  }

  public setSource(source: any) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setStyle(style: any) {
    this.style = style;
    if (this.style == null) {
      this.style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
