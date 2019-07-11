import { Vector } from './Vector';

export class ExternalVector extends Vector {
  private strategy_: (extent: [number, number, number, number], resolution: number) => any;

  private origstrategy_: (extent: [number, number, number, number], resolution: number) => any;

  constructor(options: any = {}) {
    super({ ...options, useSpatialIndex: false });
    this.origstrategy_ = this.strategy_;
    this.strategy_ = (extent: [number, number, number, number], resolution: number) => {
      if (this.oldProjectionCode !== this.actualProjectionCode) {
        this.clear();
      }
      return this.origstrategy_.call(this, extent, resolution);
    };
    this.oldProjectionCode = null;
    this.actualProjectionCode = null;
    this.label = options.label ? options.label : this.constructor.name;
  }
}
