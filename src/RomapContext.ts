import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import { LayersManager } from './LayersManager';
import { ToolsManager } from './ToolsManager';

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
   * Layers manager
   */
  layersManager: LayersManager;
  /**
   * Tools manager
   */
  toolsManager: ToolsManager;
  /**
   * Get localized text
   */
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string }) => string;
}

// Romap context
export const romapContext = React.createContext<IRomapContext>({
  olMap: null,
  olGroup: null,
  layersManager: null,
  toolsManager: null,
  getLocalizedText: (code: string, defaultText: string, data?: { [key: string]: string }) => {
    return defaultText;
  }
});
