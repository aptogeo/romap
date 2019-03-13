import OlImageArcGISRest from 'ol/source/ImageArcGISRest';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse } from './IExtended';
import { IImage } from './IImage';

export class ImageArcGISRest extends OlImageArcGISRest implements IImage {
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
