import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';

// Map context
export const mapContext = React.createContext<{
  /**
   * OpenLayers map.
   */
  olMap?: OlMap;
  /**
   * OpenLayers group.
   */
  olGroup?: GroupLayer;
}>({});
