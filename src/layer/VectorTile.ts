import * as React from 'react';
import OlVectorTileLayer from 'ol/layer/VectorTile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { IVectorTile } from '../source';

export interface IVectorTileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: IVectorTile;
  /**
   * Style.
   */
  style?: any;
}

export class VectorTile extends BaseLayer<IVectorTileProps, {}, OlVectorTileLayer, IVectorTile> {
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

  public setSource(source: IVectorTile) {
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
