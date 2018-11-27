import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';

/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
export function walk(top: OlMap | OlGroupLayer, fn: (layer: OlBaseLayer, idx: number, parent: OlGroupLayer) => boolean) {
  const group = top instanceof OlMap ? top.getLayerGroup() : top;
  group.getLayers().forEach((layer: OlBaseLayer, idx: number) => {
    if (layer) {
      const cont = fn(layer, idx, group);
      if (cont !== false && layer instanceof OlGroupLayer) {
        walk(layer, fn);
      }
    }
  });
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
