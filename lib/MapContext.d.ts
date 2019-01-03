import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
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
export declare const mapContext: React.Context<IMapContext>;
