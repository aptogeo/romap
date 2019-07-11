import OlTileArcGISRest from 'ol/source/TileArcGISRest';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { ITileImage } from './ITileImage';

export class TileArcGISRest extends OlTileArcGISRest implements ITileImage {
  protected label: string;

  protected type: IFeatureType<number>;

  constructor(options: any = {}) {
    super(options);
    this.type = options.type ? options.type : null;
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
