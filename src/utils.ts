import * as React from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
import { isEqual } from 'lodash';
import {  IInfoLayer } from './RomapContext';
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


export function mountInfoLayers(infoLayers: Map<string, IInfoLayer>, children: React.ReactNode) {
  if (children) {
    React.Children.map(children, (child: React.ReactElement<any>) => {
      if (BaseLayer.isPrototypeOf(child.type)) {
        const props = child.props as IBaseLayerProps;
        infoLayers.set(props.id, {
          reactBaseLayerElement: child,
          reactBaseLayerProps: props,
          status: 'orig_add'
        });
      }
    });
  }
}

export function updateInfoLayers(infoLayers: Map<string, IInfoLayer>, children: React.ReactNode): boolean {
  infoLayers.forEach((infoLayer, id) => {
    if (infoLayer.status === 'orig_add') {
      infoLayer.status = 'orig_del';
    }
  });
  let changed = false;
  if (children) {
    React.Children.map(children, (child: React.ReactElement<any>) => {
      if (BaseLayer.isPrototypeOf(child.type)) {
        const props = child.props as IBaseLayerProps;
        const current = infoLayers.get(props.id);
        if (!current) {
          infoLayers.set(props.id, {
            reactBaseLayerElement: child,
            reactBaseLayerProps: props,
            status: 'orig_add'
          });
          changed = true;
        } else {
          current.status = 'orig_add';
          if (!isEqual(props, current.reactBaseLayerProps)) {
            changed = true;
          }
        }
      }
    });
  }
  infoLayers.forEach((infoLayer, id) => {
    if (infoLayer.status === 'orig_del') {
      infoLayers.delete(id);
      changed = true;
    }
  });
  return changed;
}

export function setInfoLayerInMap(infoLayers: Map<string, IInfoLayer>, infoLayer: IInfoLayer): boolean {
  let changed = false;
  const current = infoLayers.get(infoLayer.reactBaseLayerProps.id);
  if (!current) {
    infoLayers.set(infoLayer.reactBaseLayerProps.id, {
      ...infoLayer,
      status: 'ext_add'
    });
    changed = true;
  } else {
    if (infoLayer.status === 'ext_add' && current.status === 'orig_add') {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'orig_modif_by_ext'
      });
      changed = true;
    } else if (infoLayer.status === 'ext_add' && current.status === 'ext_add') {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'ext_add'
      });
      changed = true;
    } else if (infoLayer.status === 'ext_del' && current.status === 'orig_add') {
      infoLayers.set(infoLayer.reactBaseLayerProps.id, {
        ...infoLayer,
        status: 'orig_del_by_ext'
      });
      changed = true;
    } else if (infoLayer.status === 'ext_del' && current.status === 'ext_add') {
      infoLayers.delete(infoLayer.reactBaseLayerProps.id);
      changed = true;
    }
  }
  return changed;
}