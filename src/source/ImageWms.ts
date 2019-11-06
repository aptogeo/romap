import OlImageWMS from 'ol/source/ImageWMS';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { IImage } from './IImage';
import { getLayersFromTypes } from '../utils';

export class ImageWms extends OlImageWMS implements IImage {
  protected options: any;

  protected label: string;

  protected types: IFeatureType<string>[];

  constructor(options: any = {}) {
    super({ ...options, params: { LAYERS: getLayersFromTypes(options.types) } });
    this.options = options;
    this.label = options.label ? options.label : this.constructor.name;
    this.types = options.types;
  }

  public getSourceTypeName(): string {
    return 'ImageWms';
  }

  public getSourceOptions(): any {
    return this.options;
  }
  
  public isSnapshotable(): any {
    return this.options.snapshotable == null ? true : this.options.snapshotable; // true by default
  }
  
  query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      request,
      features
    });
  }
}
