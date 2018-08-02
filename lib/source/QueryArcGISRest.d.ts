import Vector from 'ol/source/Vector';
export declare class QueryArcGISRest extends Vector {
    private srid;
    private loadedFeatures;
    private extent;
    private resolution;
    private where;
    private format;
    constructor(options?: any);
    load(extent: any, srid: any): Promise<any>;
}
