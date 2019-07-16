import OlTileWMS from 'ol/source/TileWMS';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { ITileImage } from './ITileImage';
import { getLayersFromTypes } from '../utils';

export class TileWms extends OlTileWMS implements ITileImage {
  protected label: string;

  protected types: IFeatureType<string>[];

  constructor(options: any = {}) {
    super({ ...options, params: { LAYERS: getLayersFromTypes(options.types) } });
    this.label = options.label ? options.label : this.constructor.name;
    this.types = options.types;
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      request,
      features
    });
  }
}
