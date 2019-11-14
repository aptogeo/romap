import OlImageWMS from 'ol/source/ImageWMS';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { IImage } from './IImage';
import { getLayersFromTypes } from '../utils';

export class ImageWms extends OlImageWMS implements IImage {
  protected options: any;

  constructor(options: any = {}) {
    super({ ...options, params: { LAYERS: getLayersFromTypes(options.types) } });
    this.options = options;
  }

  public getSourceTypeName(): string {
    return 'ImageWms';
  }

  public getSourceOptions(): any {
    return this.options;
  }

  public isSnapshotable(): boolean {
    return this.options.snapshotable == null ? true : this.options.snapshotable; // true by default
  }

  public isListable(): boolean {
    return this.options.listable == null ? true : this.options.listable; // true by default
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      request,
      features
    });
  }
}
