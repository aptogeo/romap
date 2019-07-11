import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
import OlSimpleGeometry from 'ol/geom/SimpleGeometry';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';
import { IFeatureType } from './source';

/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
export function walk(
  top: OlMap | OlGroupLayer,
  fn: (layer: OlBaseLayer, idx: number, parent: OlGroupLayer) => boolean
) {
  const group = top instanceof OlMap ? top.getLayerGroup() : top;
  if (group == null) {
    return;
  }
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

/**
 * Reverse coordinates.
 * @param {OlSimpleGeometry} geometry
 */
export function revertCoordinate(geometry: OlSimpleGeometry) {
  return geometry.applyTransform((input: number[], ouput: number[], dimension: number) => {
    for (let i = 0; i < input.length; i += dimension) {
      const y = input[i];
      const x = input[i + 1];
      ouput[i] = x;
      ouput[i + 1] = y;
    }
    return ouput;
  });
}

/**
 * Perform JSON equal.
 * @param obj1 object 1
 * @param obj2 object 2
 */
export function jsonEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 == null || obj2 == null) {
    return false;
  }
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Generate UUID.
 */
export function generateUUID(): string {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/**
 * Generate LAYERS param from IFeatureType array.
 */
export function getLayersFromTypes(types: IFeatureType<string>[]): string {
  if (types == null || types.length === 0) {
    return undefined;
  } else {
    return types.map(t => t.id).join(',');
  }
}
