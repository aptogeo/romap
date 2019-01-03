import { AbstractExternalFeature } from './AbstractExternalFeature';
export declare class QueryArcGISRest extends AbstractExternalFeature {
    protected where: string;
    private esriJSONFormat;
    constructor(options?: any);
    load(extent: [number, number, number, number], projectionCode: string): Promise<void | import("openlayers").Feature[]>;
}
