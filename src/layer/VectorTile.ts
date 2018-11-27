import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import VectorTileLayer from 'ol/layer/VectorTile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IVectorTileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: ol.source.VectorTile;
  /**
   * Style.
   */
  style?: any;
}

export class VectorTile extends BaseLayer<IVectorTileProps, any> {
  public source: ol.source.VectorTile;

  public style: any;

  public createOlLayer(): OlBaseLayer {
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
