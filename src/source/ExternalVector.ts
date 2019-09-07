import { Vector } from './Vector';

export class ExternalVector extends Vector {

  constructor(options: any = {}) {
    super({ ...options, useSpatialIndex: false });
  }
}
