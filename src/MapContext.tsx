import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';

// Map context
export const mapContext = React.createContext<{
  /**
   * OpenLayers map.
   */
  olMap?: OlMap;
  /**
   * OpenLayers group.
   */
  olGroup?: OlGroupLayer;
}>({});
