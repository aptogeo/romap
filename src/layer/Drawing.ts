import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { LocalFeature } from '../source/LocalFeature';
import { Base, IBaseProps } from './Base';

export interface IDrawingProps extends IBaseProps {
  /**
   * Style.
   */
  style?: any;
}

export class Drawing extends Base<IDrawingProps, any> {
  public style: any;

  public createOlLayer(): BaseLayer {
    return new VectorLayer({
      source: new LocalFeature({
        wrapX: false
      })
    });
  }

  public checkProps(props: IDrawingProps) {
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
