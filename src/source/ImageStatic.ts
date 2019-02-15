import OlImageStatic from 'ol/source/ImageStatic';
import {get as getProjection} from 'ol/proj';
import { IQueryRequest, IQueryResponse, IToc } from './IExtended';
import { IImage } from './IImage';

export class ImageStatic extends OlImageStatic implements IImage {

  private projectionCode: string;

  constructor(options?: any) {
    super(options);
    if (typeof options.projection === 'string') {
      this.projectionCode = options.projection;
    }
  }

  getProjection() {
    if (this.projectionCode != null) {
      return getProjection(this.projectionCode);
    } else {
      super.getProjection();
    }
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    return Promise.resolve({
      request,
      features: []
    });
  }

  getToc(): Promise<IToc> {
    return Promise.resolve<IToc>({ tocElements: null });
  }
}
