import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { IBaseLayerProps } from './layer/BaseLayer';

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
   * OpenLayers map.
   */
  olMap: OlMap;
  /**
   * OpenLayers group.
   */
  olGroup: OlGroupLayer;
  /**
   * Get infoLayers
   */
  getInfoLayers: (parentId?: string) => IInfoLayer[];
  /**
   * Get infoLayer
   */
  getInfoLayer: (id: string, parentId?: string) => IInfoLayer;
  /**
   * Set infoLayer
   */
  setInfoLayer: (infoLayer: IInfoLayer, setStateIfChanging?: boolean) => void;
  /**
   * Delete infoLayer
   */
  deleteInfoLayer: (id: string, setStateIfChanging?: boolean) => void;
  /**
   * Get localized text
   */
  getLocalizedText: (code: string, defaultText: string) => string;
}

// Map context
export const mapContext = React.createContext<IMapContext>({
  olMap: null,
  olGroup: null,
  getInfoLayers: (parentId?: string) => {
    return [];
  },
  getInfoLayer: (id: string, parentId?: string) => {
    return null;
  },
  setInfoLayer: (infoLayer: IInfoLayer, setStateIfChanging?: boolean) => {},
  deleteInfoLayer: (id: string, setStateIfChanging?: boolean) => {},
  getLocalizedText: (code: string, defaultText: string) => {
    return defaultText;
  }
});
