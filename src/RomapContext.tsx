import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { IBaseLayerProps } from './layer/BaseLayer';
import { InfoLayerManager } from './InfoLayerManager';

export interface IInfoLayer {
  /**
   * React BaseLayer Element.
   */
  reactBaseLayerElement: React.ReactElement<IBaseLayerProps>;
  /**
   * Id.
   */
  id: string;
  /**
   * Parent layer id.
   */
  parentId: string;
  /**
   * Status.
   */
  status: 'orig_add' | 'orig_del' | 'ext_add' | 'ext_del' | 'orig_modif_by_ext' | 'orig_del_by_ext';
}

// Map context interface
export interface IMapContext {
  /**
   * OpenLayers map
   */
  olMap: OlMap;
  /**
   * OpenLayers group
   */
  olGroup: OlGroupLayer;
  /**
   * InfoLayer Manager
   */
  infoLayerManager: InfoLayerManager<any, any>;
  /**
   * Get localized text
   */
  getLocalizedText: (code: string, defaultText: string) => string;
}

// Map context
export const mapContext = React.createContext<IMapContext>({
  olMap: null,
  olGroup: null,
  infoLayerManager: null,
  getLocalizedText: (code: string, defaultText: string) => {
    return defaultText;
  }
});
