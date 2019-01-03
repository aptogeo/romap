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
  public createOlLayer(): OlTileLayer {
    return new OlTileLayer();
  }

  public updateProps(prevProps: ITileProps, nextProps: ITileProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
  }

  public setSource(source: OlTileSource) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
