import * as React from 'react';
import OlVectorTileLayer from 'ol/layer/VectorTile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { IVectorTile } from '../source';
import { LayerStyles } from '../LayerStyles';
import { jsonEqual } from '../utils';
import { applyStyle } from 'ol-mapbox-style';

export interface IVectorTileProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: IVectorTile;
  /**
   * Layer styles.
   */
  layerStyles: LayerStyles;
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
    if (prevProps == null || !jsonEqual(prevProps.layerStyles, nextProps.layerStyles)) {
      this.setLayerStyles(nextProps.uid, nextProps.layerStyles);
    }
  }

  public setSource(source: IVectorTile) {
    if (source == null) {
      source = undefined;
    }
    this.getOlLayer().setSource(source);
  }

  public setLayerStyles(id: React.Key, layerStyles: LayerStyles) {
    if (layerStyles == null) {
      this.getOlLayer().setStyle(undefined);
      return;
    }
    const mbstyle = {
      version: 8,
      sources: {} as any,
      layers: [] as any[]
    };
    mbstyle.sources[id] = { type: 'vector' };
    layerStyles.forEach(style => {
      mbstyle.layers.push({ ...style, source: id });
    });
    applyStyle(this.getOlLayer(), mbstyle, id);
  }
}
