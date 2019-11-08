import OlImageArcGISRest from 'ol/source/ImageArcGISRest';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { IImage } from './IImage';

export class ImageArcGISRest extends OlImageArcGISRest implements IImage {
  protected options: any;

  protected label: string;

  protected type: IFeatureType<number>[];

  constructor(options: any = {}) {
    super(options);
    this.options = options;
    this.type = options.type ? options.type : null;
    this.label = options.label ? options.label : this.constructor.name;
  }

  public getSourceTypeName(): string {
    return 'ImageArcGISRest';
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
