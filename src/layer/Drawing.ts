import * as React from 'react';
import OlVectorLayer from 'ol/layer/Vector';
import { LocalFeature } from '../source/LocalFeature';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IDrawingProps extends IBaseLayerProps {
  /**
   * Style.
   */
  style?: any;
}

export class Drawing extends BaseLayer<IDrawingProps, {}, OlVectorLayer, LocalFeature> {
  public createOlLayer(): OlVectorLayer {
    return new OlVectorLayer({
      source: new LocalFeature({
        wrapX: false
      })
    });
  }

  public updateProps(prevProps: IDrawingProps, nextProps: IDrawingProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps.style != nextProps.style) {
      this.setStyle(nextProps.style);
    }
  }

  public setStyle(style: any) {
    if (style == null) {
      style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
