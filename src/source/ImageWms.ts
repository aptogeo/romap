import OlImageWMS from 'ol/source/ImageWMS';
import OlFeature from 'ol/Feature';
import { IExtended, IIdentifyRequest, IIdentifyResponse, IToc, ITocElement } from './IExtended';

export class ImageWms extends OlImageWMS implements IExtended {
  protected label: string;

  constructor(options?: any) {
    super(options);
    this.label = options.label ? options.label : this.constructor.name;
  }

  identify(request: IIdentifyRequest): Promise<IIdentifyResponse> {
    const features = [] as OlFeature[];
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
