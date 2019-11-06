import { Vector } from './Vector';

export class ExternalVector extends Vector {
  protected options: any;

  constructor(options: any = {}) {
    super({ ...options, useSpatialIndex: false });
    this.options = options;
  }

  public isSnapshotable(): any {
    return this.options.snapshotable == null ? false : this.options.snapshotable; // false by default
  }

  public getSourceTypeName(): string {
    return 'ExternalVector';
  }

  public getSourceOptions(): any {
    return this.options;
  }
}
