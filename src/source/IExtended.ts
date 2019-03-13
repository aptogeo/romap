import OlSource from 'ol/source/Source';
import OlFeature from 'ol/Feature';
import OlGeometry from 'ol/geom/Geometry';
import OlProjection from 'ol/proj/Projection';

export interface IExtended extends OlSource {
  query(identifyRequest: IQueryRequest): Promise<IQueryResponse>;
}

export interface IQueryRequest {
  geometry: OlGeometry;
  geometryProjection: OlProjection;
  filters: IFilter[];
  limit: number;
}

export interface IQueryResponse {
  request: IQueryRequest;
  features: OlFeature[];
}

export interface IFilter {
  op: Op;
  attr?: string;
  value?: string | number | boolean;
  filters?: IFilter[];
}

// And operation for group
// Or operation for group
// Eq operation for attribute (? = ?)
// Neq operation for attribute (? != ?)
// Gt operation for attribute (? > ?)
// Gte operation for attribute (? >= ?)
// Lt operation for attribute (? < ?)
// Lte operation for attribute (? <= ?)
// Lk operation for attribute (? LIKE ?)
// Nlk operation for attribute (? NOT LIKE ?)
// Ilk operation for attribute (? ILIKE ?)
// Nilk operation for attribute (? NOT ILIKE ?)
// Null operation for attribute (? IS NULL)
// Nnull operation for attribute (? IS NOT NULL)
export type Op =
  | 'and'
  | 'or'
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'lk'
  | 'nlk'
  | 'ilk'
  | 'nilk'
  | 'null'
  | 'nnull';
