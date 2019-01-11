import OlTileArcGISRest from 'ol/source/TileArcGISRest';
import OlFeature from 'ol/Feature';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';

export class TileArcGISRest extends OlTileArcGISRest implements IExtended {
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

  getToc(): Promise<IToc> {
    return Promise.resolve<IToc>({ tocElements: null });
  }
}
