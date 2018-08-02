import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';

/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
export function walk(top: OlMap | GroupLayer, fn: (layer: BaseLayer, idx: number, parent: GroupLayer) => boolean) {
  const group = 'getLayerGroup' in top ? top.getLayerGroup() : top;
  if (group && 'getLayers' in group) {
    group.getLayers().forEach((layer: any, idx: number) => {
      if (layer) {
        const cont = fn(layer, idx, group);
        if (cont !== false && 'getLayers' in layer) {
          walk(layer, fn);
        }
      }
    });
  }
}

/**
 * Clone view.
 * @param {OlView} view
 */
export function cloneView(view: OlView) {
  const center = view.getCenter();
  const newCenter = [center[0], center[1]] as [number, number];
  return new OlView({
    center: newCenter,
    zoom: view.getZoom(),
    resolution: view.getResolution(),
    rotation: view.getRotation(),
    projection: view.getProjection(),
    maxResolution: view.getMaxResolution(),
    minResolution: view.getMinResolution(),
    maxZoom: view.getMaxZoom(),
    minZoom: view.getMinZoom(),
    resolutions: view.getResolutions()
  });
}
