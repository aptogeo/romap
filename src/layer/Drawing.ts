import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { LocalFeature } from '../source/LocalFeature';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IDrawingProps extends IBaseLayerProps {
  /**
   * Style.
   */
  style?: any;
}

export class Drawing extends BaseLayer<IDrawingProps, any> {
  public style: any;

  public createOlLayer(): OlBaseLayer {
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
