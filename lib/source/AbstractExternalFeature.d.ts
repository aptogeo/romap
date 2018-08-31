import Feature from 'ol/Feature';
import { AbstractFeature } from './AbstractFeature';
export declare class AbstractExternalFeature extends AbstractFeature {
    private projectionCode;
    private loadedFeatures;
    private extent;
    constructor(options?: any);
    load(extent: number[], projectionCode: string): Promise<Feature[]>;
    containsExtent(extent1: number[], extent2: number[]): boolean;
}
