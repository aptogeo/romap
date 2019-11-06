import OlVectorTile from 'ol/source/VectorTile';
import { IExtended, IQueryRequest, IQueryResponse } from './IExtended';

export abstract class VectorTile extends OlVectorTile implements IExtended {
  protected options: any;

  protected label: string;

  constructor(options?: any) {
    super(options);
    this.options = options;
    this.label = options.label ? options.label : this.constructor.name;
  }

  public getSourceTypeName(): string {
    return 'VectorTile';
  }

  public getSourceOptions(): any {
    return this.options;
  }

  public isSnapshotable(): any {
    return this.options.snapshotable == null ? false : this.options.snapshotable; // false by default
  }

  public query(request: IQueryRequest): Promise<IQueryResponse> {
    return Promise.resolve({
      request,
      features: []
    });
  }
}
