import Vector from 'ol/source/Vector';
export default class WfsSource extends Vector {
    private projectionCode;
    private loadedFeatures;
    private extent;
    private resolution;
    private typename;
    private format;
    constructor(options?: any);
    load(extent: number[], projectionCode: any): Promise<any>;
}
