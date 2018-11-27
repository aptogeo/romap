import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlVectorTileLayer from 'ol/layer/VectorTile';
import OlVectorTileSource from 'ol/source/VectorTile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface IVectorTileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlVectorTileSource;
  /**
   * Style.
   */
  style?: any;
}

export class VectorTile extends BaseLayer<IVectorTileProps, {}, OlVectorTileLayer, OlVectorTileSource> {
  public source: OlVectorTileSource;

  public style: any;

  public createOlLayer(): OlVectorTileLayer {
    return new OlVectorTileLayer();
  }

  public checkProps(props: IVectorTileProps) {
    super.checkProps(props);
    this.setSource(props.source);
    this.setStyle(props.style);
  }

  public setSource(source: OlVectorTileSource) {
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
