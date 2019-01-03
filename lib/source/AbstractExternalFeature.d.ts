import OlFeature from 'ol/Feature';
import { AbstractFeature } from './AbstractFeature';
export declare class AbstractExternalFeature extends AbstractFeature {
    private projectionCode;
    private loadedFeatures;
    private extent;
    constructor(options?: any);
    load(extent: [number, number, number, number], projectionCode: string): Promise<void | OlFeature[]>;
    containsExtent(extent1: [number, number, number, number], extent2: [number, number, number, number]): boolean;
}
