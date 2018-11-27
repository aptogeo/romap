import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IVectorProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlVectorSource;
  /**
   * Style.
   */
  style?: any;
}

export class Vector extends BaseLayer<IVectorProps, {}, OlVectorLayer, OlVectorSource> {
  public source: OlVectorSource;

  public style: any;

  public createOlLayer(): OlVectorLayer {
    return new OlVectorLayer();
  }

  public checkProps(props: IVectorProps) {
    super.checkProps(props);
    this.setSource(props.source);
    this.setStyle(props.style);
  }

  public setSource(source: OlVectorSource) {
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
