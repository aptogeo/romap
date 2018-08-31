import { AbstractFeature } from './AbstractFeature';
export declare class LocalFeature extends AbstractFeature {
    private savedFeatures;
    private oldViewProjection;
    private viewProjection;
    private lastExtent;
    private lastResolution;
    private optionLoader;
    private optionStrategy;
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
