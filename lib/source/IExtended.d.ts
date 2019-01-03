import OlMap from 'ol/Map';
import OlLayer from 'ol/layer/Layer';
import OlSource from 'ol/source/Source';
import OlFeature from 'ol/Feature';
import OlGeometry from 'ol/geom/Geometry';
import OlProjection from 'ol/proj/Projection';
export interface IExtended extends OlSource {
    query(identifyRequest: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
export interface IQueryRequest {
    olMap: OlMap;
    layer: OlLayer;
    geometry: OlGeometry;
    geometryProjection: OlProjection;
    limit: number;
}
export interface IQueryResponse {
    request: IQueryRequest;
    features: OlFeature[];
}
export interface IToc {
    tocElements: ITocElement[];
}
export interface ITocElement {
    name: string;
    tocLegendElements?: ITocLegendElement[];
    tocElements?: ITocElement[];
}
export interface ITocLegendElement {
    image: string;
    label: string;
}
