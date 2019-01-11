import OlImageArcGISRest from 'ol/source/ImageArcGISRest';
import OlFeature from 'ol/Feature';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';

export class ImageArcGISRest extends OlImageArcGISRest implements IExtended {
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
