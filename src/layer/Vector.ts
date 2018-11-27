import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IVectorProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: ol.source.Vector;
  /**
   * Style.
   */
  style?: any;
}

export class Vector extends BaseLayer<IVectorProps, any> {
  public source: ol.source.Vector;

  public style: any;

  public createOlLayer(): OlBaseLayer {
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
