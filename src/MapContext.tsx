import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';

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
}

// Map context
export const mapContext = React.createContext<IMapContext>({ olMap: null, olGroup: null });
