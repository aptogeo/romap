import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
export declare const mapContext: React.Context<{
    /**
     * OpenLayers map.
     */
    olMap?: OlMap;
    /**
     * OpenLayers group.
     */
    olGroup?: GroupLayer;
}>;
