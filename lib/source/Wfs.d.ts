import { AbstractExternalFeature } from './AbstractExternalFeature';
export declare class Wfs extends AbstractExternalFeature {
    private typename;
    private format;
    constructor(options?: any);
    load(extent: number[], projectionCode: string): Promise<any>;
}
