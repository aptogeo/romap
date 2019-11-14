import * as React from 'react';
import OlVectorLayer from 'ol/layer/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { IVector } from '../source';
import { LayerStyles } from '../LayerStyles';
import { jsonEqual } from '../utils';
import { applyStyle } from 'ol-mapbox-style';

export interface IVectorProps extends IBaseLayerProps {
  /**
   * Source.
   */
  source: IVector;
  /**
   * Layer styles.
   */
  layerStyles: LayerStyles;
}

export class Vector extends BaseLayer<IVectorProps, {}, OlVectorLayer, IVector> {
  public createOlLayer(): OlVectorLayer {
    return new OlVectorLayer();
  }

  public updateProps(prevProps: IVectorProps, nextProps: IVectorProps) {
    super.updateProps(prevProps, nextProps);
    if (prevProps == null || prevProps.source !== nextProps.source) {
      this.setSource(nextProps.source);
    }
    if (prevProps == null || !jsonEqual(prevProps.layerStyles, nextProps.layerStyles)) {
      this.setLayerStyles(nextProps.uid, nextProps.layerStyles);
    }
  }

  public setSource(source: IVector) {
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
