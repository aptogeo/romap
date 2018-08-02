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

export class Vector extends Base<IVectorTileProps, any> {
  public style: any;

  public createOlLayer(): BaseLayer {
    return new VectorTileLayer({ source: this.props.source });
  }

  public checkProps(props: IVectorTileProps) {
    super.checkProps(props);
    this.setStyle(props.style);
  }

  public setStyle(style: any) {
    this.style = style;
    if (this.style == null) {
      this.style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
