import OlVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlGeoJSON from 'ol/format/GeoJSON';
import booleanDisjoint from '@turf/boolean-disjoint';
import { Geometry } from '@turf/helpers/lib/geojson';
import { IExtended, IQueryRequest, IQueryResponse, IToc, ITocElement } from './IExtended';

export abstract class AbstractFeature extends OlVector implements IExtended {
  protected label: string;

  private queryGeoJSONFormat = new OlGeoJSON();

  constructor(options?: any) {
    super(options);
    this.constructor.name;
    this.label = options.label ? options.label : this.constructor.name;
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const { olMap, geometry, geometryProjection, limit } = request;
    const features = [] as OlFeature[];
    const destGeometry = geometry.transform(geometryProjection, olMap.getView().getProjection());
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
    const tocElements: ITocElement[] = [];
    tocElements.push({
      name: this.label,
      tocElements: null,
      tocLegendElements: null
    });
    return Promise.resolve<IToc>({ tocElements });
  }
}
