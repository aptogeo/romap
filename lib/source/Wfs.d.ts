import { AbstractExternalFeature } from './AbstractExternalFeature';
export declare class Wfs extends AbstractExternalFeature {
    private typename;
    private geoJSONFormat;
    constructor(options?: any);
    load(extent: [number, number, number, number], projectionCode: string): Promise<void | import("openlayers").Feature[]>;
}
