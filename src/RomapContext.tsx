import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { RomapManager } from './RomapManager';

// Romap context interface
export interface IRomapContext {
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
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string }) => string;
}

// Romap context
export const romapContext = React.createContext<IRomapContext>({
  olMap: null,
  olGroup: null,
  romapManager: null,
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string }) => {
    return defaultText;
  }
});
