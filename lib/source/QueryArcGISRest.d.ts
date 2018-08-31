import { AbstractExternalFeature } from './AbstractExternalFeature';
export declare class QueryArcGISRest extends AbstractExternalFeature {
    private where;
    private format;
    constructor(options?: any);
    load(extent: any, projectionCode: string): Promise<any>;
}
