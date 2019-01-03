import OlProjection from 'ol/proj/Projection';
import { AbstractFeature } from './AbstractFeature';
export declare class LocalFeature extends AbstractFeature {
    protected savedFeatures: any;
    protected oldViewProjection: OlProjection;
    protected viewProjection: OlProjection;
    protected lastExtent: [number, number, number, number];
    protected lastResolution: number;
    protected optionLoader: (extent: [number, number, number, number], resolution: number, projection: OlProjection) => void;
    protected optionStrategy: (extent: [number, number, number, number], resolution: number) => [number, number, number, number];
    constructor(options?: any);
    clearForReload(): void;
    clear(fast?: boolean): void;
    private projectAll;
    private reportAll;
    private setOriginal;
    private handleAddFeature;
    private handleChangeFeatureGeometry;
    private handleChangeGeometry;
}
