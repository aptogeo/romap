import OlFeature from 'ol/Feature';
import { get as getOlProjection, transformExtent } from 'ol/proj';
import WMSGetFeatureInfoFormat from 'ol/format/WMSGetFeatureInfo';
import OlSimpleGeometry from 'ol/geom/SimpleGeometry';
import { IQueryRequest, IFeatureType, IQueryFeatureTypeResponse } from '../IExtended';
import { send } from 'bhreq';
import { toGeoJSONGeometry, revertCoordinate, disjoint } from '../../utils';

export function wmsQueryOne(serviceUrl: string, type: IFeatureType<string>, request: IQueryRequest): Promise<IQueryFeatureTypeResponse> {
  const { mapProjection, geometry, geometryProjection, limit } = request;
  let extent = transformExtent(geometry.getExtent(), geometryProjection, mapProjection);
  if (extent[0] > extent[2]) {
    const val = extent[0];
    extent[0] = extent[2];
    extent[2] = val;
  }
  if (extent[1] > extent[3]) {
    const val = extent[1];
    extent[1] = extent[3];
    extent[3] = val;
  }
  const sld = `<StyledLayerDescriptor version="1.0.0"><UserLayer><Name>${type.id}</Name><UserStyle><FeatureTypeStyle><Rule><PointSymbolizer><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter name="fill">#FFFFFF</CssParameter></Fill></Mark><Size>3</Size></Graphic></PointSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#000000</CssParameter><CssParameter name="stroke-width">3</CssParameter></Stroke></LineSymbolizer><PolygonSymbolizer><Stroke><CssParameter name="stroke">#000000</CssParameter><CssParameter name="stroke-width">3</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></UserLayer></StyledLayerDescriptor>`;
  const cql = ''; // TODO
  let url = `${serviceUrl}?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&QUERY_LAYERS=${type.id}&LAYERS=${
    type.id
    }&SLD_BODY=${encodeURIComponent(sld)}&X=1&Y=1&SRS=${mapProjection.getCode()}&WIDTH=3&HEIGHT=3&BBOX=${extent.join(
      ','
    )}&INFO_FORMAT=application/vnd.ogc.gml`;
  if (cql != null && cql != '') {
    url += `&CQL_FILTER=${cql}`;
  }
  if (limit) {
    url += `&FEATURE_COUNT=${limit}`;
  }
  return send({ url }).then(res => {
    const features = [] as OlFeature[];
    // Search projection on results
    let dataProjectionCode = mapProjection.getCode();
    let dataProjection = mapProjection;
    const res1 = res.body.match(/\ssrsName=\"([^\"]+)\"/i);
    if (res1 && res1.length >= 2) {
      const res2 = res1[1].match(/(\d+)(?!.*\d)/g);
      if (res2 && res2.length > 0) {
        dataProjectionCode = 'EPSG:' + res2[res2.length - 1];
      }
    }
    try {
      dataProjection = getOlProjection(dataProjectionCode);
    } catch (err) {
      console.error(err);
    }
    // Read features
    const allFeatures = new WMSGetFeatureInfoFormat().readFeatures(res.body);
    if (allFeatures && allFeatures.length > 0) {
      allFeatures.forEach((feature: OlFeature) => {
        if ((limit == null || features.length < limit) && feature.getGeometry() != null) {
          if (dataProjection.getUnits() === 'degrees') {
            if (feature.getGeometry()) {
              // In degree: This formats the geographic coordinates in longitude/latitude (x/y) order.
              // Reverse coordinates !
              revertCoordinate(feature.getGeometry() as OlSimpleGeometry);
            }
          }
          feature.getGeometry().transform(dataProjection, mapProjection);
          // Check intersection
          if (
            geometry == null ||
            geometry.getType() === 'Point' ||
            geometry.getType() === 'MultiPoint' ||
            !disjoint(toGeoJSONGeometry(feature.getGeometry()), toGeoJSONGeometry(geometry))
          ) {
            features.push(feature);
          }
        }
      });
    }
    return Promise.resolve({
      type,
      features
    });
  });
}
