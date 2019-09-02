import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { RomapManager } from './RomapManager';

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
  romapManager: RomapManager<any, any>;
  /**
   * Get localized text
   */
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string; }) => string;
}

// Map context
export const mapContext = React.createContext<IMapContext>({
  olMap: null,
  olGroup: null,
  romapManager: null,
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string; }) => {
    return defaultText;
  }
});
