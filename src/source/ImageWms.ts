import OlImageWMS from 'ol/source/ImageWMS';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType, IQueryFeatureTypeResponse } from './IExtended';
import { IImage } from './IImage';
import { getLayersFromTypes } from '../utils';

export class ImageWms extends OlImageWMS implements IImage {
  protected options: any;

  constructor(options: any = {}) {
    super({ ...options });
    this.options = options;
    this.set('types', options.types);
    this.set('params', { ...this.getParams(), LAYERS: getLayersFromTypes(options.types) });
    this.on('propertychange', this.handlePropertychange);
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

  public query(request: IQueryRequest): Promise<IQueryResponse> {
    let extent: [number, number, number, number];
    if (request.geometry != null) {
      extent = [-180.0, -90.0, 180.0, 90.0];
    } else {
      // TODO extent form geom
    }
    // TODO reproj extent
    const promises: Array<Promise<IQueryFeatureTypeResponse>> = [];
    for (const type of this.options.types) {
      promises.push(this.queryOne(type, extent, request));
    }
    return Promise.all(promises).then((featureTypeResponses: IQueryFeatureTypeResponse[]) => {
      return {
        request,
        featureTypeResponses
      };
    });
  }

  private queryOne(
    type: IFeatureType<string>,
    extent: [number, number, number, number],
    request: IQueryRequest
  ): Promise<IQueryFeatureTypeResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      type,
      features
    });
  }

  private handlePropertychange = (event: any) => {
    const key = event.key;
    const value = event.target.get(key);
    if (key === 'types') {
      this.set('params', { ...this.getParams(), LAYERS: getLayersFromTypes(value) });
      this.options.types = value;
    }
  };
}
