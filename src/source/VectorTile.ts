import OlVectorTile from 'ol/source/VectorTile';
import { IExtended, IQueryRequest, IQueryResponse } from './IExtended';

export abstract class VectorTile extends OlVectorTile implements IExtended {
  protected options: any;

  protected label: string;

  constructor(options: any = {}) {
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

  public isSnapshotable(): boolean {
    return this.options.snapshotable == null ? true : this.options.snapshotable; // true by default
  }

  public isListable(): boolean {
    return this.options.listable == null ? true : this.options.listable; // true by default
  }

  public query(request: IQueryRequest): Promise<IQueryResponse> {
    return Promise.resolve({
      request,
      features: []
    });
  }
}
