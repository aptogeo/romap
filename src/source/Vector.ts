import OlVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import { fromCircle } from 'ol/geom/Polygon';
import Circle from 'ol/geom/Circle';
import OlGeoJSON from 'ol/format/GeoJSON';
import booleanDisjoint from '@turf/boolean-disjoint';
import { Geometry } from '@turf/helpers/lib/geojson';
import { IQueryRequest, IQueryResponse, IToc } from './IExtended';
import { IVector } from './IVector';

export abstract class Vector extends OlVector implements IVector {
  protected label: string;

  private queryGeoJSONFormat = new OlGeoJSON();

  constructor(options?: any) {
    super(options);
    this.label = options.label ? options.label : this.constructor.name;
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const { olMap, geometry, geometryProjection, limit } = request;
    const features = [] as OlFeature[];
    let destGeometry = geometry.transform(geometryProjection, olMap.getView().getProjection());
    if (destGeometry.getType() === 'Circle') {
      destGeometry = fromCircle(geometry as Circle);
    }
    const extent = destGeometry.getExtent();
    const jsonGeom = (this.queryGeoJSONFormat.writeGeometryObject(destGeometry) as any) as Geometry;
    this.forEachFeatureIntersectingExtent(extent, (feature: OlFeature) => {
      if (features.length < limit) {
        const jsonResGeom = (this.queryGeoJSONFormat.writeGeometryObject(feature.getGeometry()) as any) as Geometry;
        if (!booleanDisjoint(jsonResGeom, jsonGeom)) {
          features.push(feature);
        }
      }
    });
    return Promise.resolve({
      request,
      features
    });
  }

  getToc(): Promise<IToc> {
    return Promise.resolve<IToc>({ tocElements: null });
  }
}
