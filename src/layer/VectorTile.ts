import * as React from 'react';
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
  public createOlLayer(): OlVectorTileLayer {
    return new OlVectorTileLayer();
  }

  public updateProps(prevProps: IVectorTileProps, nextProps: IVectorTileProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps == null || prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
    if (prevProps == null || prevProps.style != nextProps.style) {
      this.setStyle(nextProps.style);
    }
  }

  public setSource(source: OlVectorTileSource) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setStyle(style: any) {
    if (style == null) {
      style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
