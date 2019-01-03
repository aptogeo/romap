import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
export declare function walk(top: OlMap | OlGroupLayer, fn: (layer: OlBaseLayer, idx: number, parent: OlGroupLayer) => boolean): void;
/**
 * Clone view.
 * @param {OlView} view
 */
export declare function cloneView(view: OlView): OlView;
