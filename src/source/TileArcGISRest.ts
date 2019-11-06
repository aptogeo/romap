import OlTileArcGISRest from 'ol/source/TileArcGISRest';
import OlFeature from 'ol/Feature';
import { IQueryRequest, IQueryResponse, IFeatureType } from './IExtended';
import { ITileImage } from './ITileImage';

export class TileArcGISRest extends OlTileArcGISRest implements ITileImage {
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
    return 'TileArcGISRest';
  }

  public getSourceOptions(): any {
    return this.options;
  }

  public isSnapshotable(): any {
    return this.options.snapshotable == null ? true : this.options.snapshotable; // true by default
  }
  
  public query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
    return Promise.resolve({
      request,
      features
    });
  }
}
