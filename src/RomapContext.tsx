import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';

export interface IInfoLayer {
  /**
   * React BaseLayer Element.
   */
  reactBaseLayerElement: React.ReactElement<BaseLayer<any, any, any, any>>;
  /**
   * React BaseLayer Props.
   */
  reactBaseLayerProps: IBaseLayerProps;
  /**
   * Status.
   */
  status: 'orig_add' | 'orig_del' | 'ext_add' | 'ext_del' | 'orig_modif_by_ext' | 'orig_del_by_ext';
}

// Map context interface
export interface IMapContext {
  /**
   * OpenLayers map.
   */
  olMap: OlMap;
  /**
   * OpenLayers group.
   */
  olGroup: OlGroupLayer;
  /**
   * InfoLayers
   */
  infoLayers: Map<string, IInfoLayer>;
  /**
   * Set infoLayer
   */
  setInfoLayer: (infoLayer: IInfoLayer) => void;
}

// Map context
export const mapContext = React.createContext<IMapContext>({
  olMap: null,
  olGroup: null,
  infoLayers: null,
  setInfoLayer: (infoLayer: IInfoLayer) => {}
});
