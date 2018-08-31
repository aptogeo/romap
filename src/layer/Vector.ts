import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { Base, IBaseProps } from './Base';

export interface IVectorProps extends IBaseProps {
  /**
   * Source.
   */
  source: any;
  /**
   * Style.
   */
  style?: any;
}

export class Vector extends Base<IVectorProps, any> {
  public source: any;

  public style: any;

  public createOlLayer(): BaseLayer {
    return new VectorLayer();
  }

  public checkProps(props: IVectorProps) {
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
