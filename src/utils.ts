import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import OlView from 'ol/View';
import OlSimpleGeometry from 'ol/geom/SimpleGeometry';
import { IFeatureType, LocalVector } from './source';
import { LayersManager } from './LayersManager';
import KML from 'ol/format/KML';
import Feature from 'ol/Feature';
import * as JSZip from 'jszip';

const kmlFormat = new KML({ extractStyles: true, showPointNames: false });

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
 * @param ignore list of ignored attribute
 */
export function jsonEqual(obj1: any, obj2: any, ignore?: string[]): boolean {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 == null || obj2 == null) {
    return false;
  }
  let str1 = '';
  let obj = { ...obj1 };
  if (ignore != null) {
    for (const key of ignore) {
      obj[key] = null;
    }
  }
  try {
    str1 = JSON.stringify(obj);
  } catch (error) {
    console.error(error, obj);
  }
  let str2 = '';
  obj = { ...obj2 };
  if (ignore != null) {
    for (const key of ignore) {
      obj[key] = null;
    }
  }
  try {
    str2 = JSON.stringify(obj);
  } catch (error) {
    console.error(error, obj);
  }
  return str1 === str2;
}

/**
 * Generate unique id.
 */
export function uid(): React.Key {
  globalKey++;
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return (
    'xxxxxxxxxxxxxxxy'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }) + globalKey.toString(16)
  );
}
let globalKey = 0;

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

/**
 * Load KML from file.
 */
export function loadKML(file: File, layersManager: LayersManager) {
  const reader = new FileReader();
  reader.onload = () => {
    const kmlString = reader.result as string;
    const name = `${kmlFormat.readName(kmlString)} (${file.name})`;
    const features: Feature[] = kmlFormat.readFeatures(kmlString, {
      featureProjection: layersManager
        .getOlMap()
        .getView()
        .getProjection()
    }) as Feature[];
    const localVectorSource = layersManager.createAndAddLayerFromSource(
      'LocalVector',
      {},
      { uid: uid(), name }
    ) as LocalVector;
    localVectorSource.addFeatures(features);
  };
  reader.readAsText(file);
}

/**
 * Load KMZ from file.
 */
export function loadKMZ(file: File, layersManager: LayersManager) {
  const zipFile = new JSZip();
  zipFile.loadAsync(file).then(zip => {
    const promises = Object.keys(zip.files)
      .map(name => zip.files[name])
      .map(entry =>
        entry.async('blob').then(blob => ({
          name: entry.name,
          blob
        }))
      );
    Promise.all(promises).then(elements => {
      const imageElements = elements.filter(element => /\.(jpe?g|png|gif|bmp)$/i.test(element.name));
      const docElement = elements.filter(element => element.name === 'doc.kml').pop();
      const reader = new FileReader();
      reader.onload = () => {
        const kmlString = reader.result as string;
        const name = `${kmlFormat.readName(kmlString)} (${file.name})`;
        const features: Feature[] = kmlFormat.readFeatures(kmlString, {
          featureProjection: layersManager
            .getOlMap()
            .getView()
            .getProjection()
        }) as Feature[];
        const localVectorSource = layersManager.createAndAddLayerFromSource(
          'LocalVector',
          {},
          { uid: uid(), name }
        ) as LocalVector;
        localVectorSource.addFeatures(features);
      };
      reader.readAsText(docElement.blob);
    });
  });
}

/**
 * Load zipped Shapefile from file.
 */
export function loadZippedShapefile(file: File, layersManager: LayersManager) {}
