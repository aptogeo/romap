import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlTileLayer from 'ol/layer/Tile';
import OlTileSource from 'ol/source/Tile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';

export interface ITileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: OlTileSource;
}

export class Tile extends BaseLayer<ITileProps, {}, OlTileLayer, OlTileSource> {
  public source: OlTileSource;

  public createOlLayer(): OlTileLayer {
    return new OlTileLayer();
  }

  public checkProps(props: ITileProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: OlTileSource) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
