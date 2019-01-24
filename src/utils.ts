import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
import OlSimpleGeometry from 'ol/geom/SimpleGeometry';
import { IInfoLayer } from './RomapContext';
import { BaseLayer, IBaseLayerProps } from './layer/BaseLayer';

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

export function mountInfoLayers(
  setInfoLayer: (infoLayer: IInfoLayer, setStateIfChanging?: boolean) => void,
  children: React.ReactNode,
  parentId: string
) {
  if (children) {
    React.Children.map(children, (child: React.ReactElement<any>) => {
      if (BaseLayer.isPrototypeOf(child.type)) {
        const props = child.props as IBaseLayerProps;
        setInfoLayer({
          reactBaseLayerElement: child,
          //reactBaseLayerProps: props,
          status: 'orig_add',
          id: props.id,
          parentId
        });
      }
    });
  }
}

export function updateInfoLayers(
  setInfoLayer: (infoLayer: IInfoLayer, setStateIfChanging?: boolean) => void,
  prevChildren: React.ReactNode,
  nextChildren: React.ReactNode,
  prevParentId: string,
  nextParentId: string
) {
  if (prevChildren) {
    React.Children.map(prevChildren, (child: React.ReactElement<any>) => {
      if (BaseLayer.isPrototypeOf(child.type)) {
        const props = child.props as IBaseLayerProps;
        setInfoLayer(
          {
            reactBaseLayerElement: child,
            //reactBaseLayerProps: props,
            status: 'orig_del',
            id: props.id,
            parentId: prevParentId
          },
          false
        );
      }
    });
  }
  if (nextChildren) {
    React.Children.map(nextChildren, (child: React.ReactElement<any>) => {
      if (BaseLayer.isPrototypeOf(child.type)) {
        const props = child.props as IBaseLayerProps;
        setInfoLayer({
          reactBaseLayerElement: child,
          //reactBaseLayerProps: props,
          status: 'orig_add',
          id: props.id,
          parentId: nextParentId
        });
      }
    });
  }
}
