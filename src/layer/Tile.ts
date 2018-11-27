import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface ITileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: ol.source.Tile;
}

export class Tile extends BaseLayer<ITileProps, any> {
  public source: ol.source.Tile;

  public createOlLayer(): OlBaseLayer {
    return new TileLayer();
  }

  public checkProps(props: ITileProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: any) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
