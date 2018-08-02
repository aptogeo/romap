import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
export declare function walk(top: OlMap | GroupLayer, fn: (layer: BaseLayer, idx: number, parent: GroupLayer) => boolean): void;
/**
 * Clone view.
 * @param {OlView} view
 */
export declare function cloneView(view: OlView): OlView;
