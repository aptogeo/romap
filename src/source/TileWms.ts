import OlTileWMS from 'ol/source/TileWMS';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse } from './IExtended';
import { ITileImage } from './ITileImage';

export class TileWms extends OlTileWMS implements ITileImage {
  protected label: string;

  constructor(options?: any) {
    super(options);
    this.label = options.label ? options.label : this.constructor.name;
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      request,
      features
    });
  }
}
