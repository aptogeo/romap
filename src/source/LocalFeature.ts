import OlProjection from 'ol/proj/Projection';
import { AbstractFeature } from './AbstractFeature';
import { jsonEqual } from '../utils';

export class LocalFeature extends AbstractFeature {
  protected savedFeatures: any;

  protected oldViewProjectionCode: string;

  protected viewProjectionCode: string;

  protected lastExtent: [number, number, number, number];

  protected lastResolution: number;

  protected optionLoader: (
    extent: [number, number, number, number],
    resolution: number,
    projection: OlProjection
  ) => void;

  protected optionStrategy: (
    extent: [number, number, number, number],
    resolution: number
  ) => [number, number, number, number];

  constructor(options?: any) {
    super({
      ...options,
      loader: (extent: [number, number, number, number], resolution: number, projection: OlProjection) => {
        const projectionCode = projection.getCode();
        if (projectionCode != this.viewProjectionCode) {
          this.oldViewProjectionCode = this.viewProjectionCode;
          this.viewProjectionCode = projectionCode;
          this.projectAll();
        } else {
          this.reportAll();
        }
        if (this.optionLoader) {
          this.optionLoader.call(this, extent, resolution, projection);
        }
      },
      strategy: (extent: [number, number, number, number], resolution: number): [[number, number, number, number]] => {
        const features = this.getFeatures();
        if (
          !jsonEqual(this.lastExtent, extent) ||
          this.lastResolution != resolution ||
          !this.savedFeatures ||
          this.savedFeatures.length !== features.length
        ) {
          this.lastExtent = extent;
          this.lastResolution = resolution;
          this.savedFeatures = features.slice(0);
          this.clearForReload();
        }
        if (this.optionStrategy) {
          return this.optionStrategy.call(this, extent, resolution);
        }
        return [extent];
      }
    });
    this.optionLoader = options.loader;
    this.optionStrategy = options.strategy;
    this.on('addfeature', this.handleAddFeature, this);
    this.viewProjectionCode = null;
    this.oldViewProjectionCode = null;
    this.savedFeatures = null;
    this.label = options.label ? options.label : this.constructor.name;
  }

  public clearForReload() {
    super.clear(true);
  }

  public clear(fast?: boolean) {
    this.savedFeatures = null;
    super.clear(fast);
  }

  private projectAll() {
    if (this.savedFeatures) {
      for (const savedFeature of this.savedFeatures) {
        if (
          savedFeature.get('originalProjectionCode') &&
          savedFeature.get('originalGeometry') &&
          this.viewProjectionCode
        ) {
          const geom = savedFeature.get('originalGeometry').clone();
          geom.transform(savedFeature.get('originalProjectionCode'), this.viewProjectionCode);
          savedFeature.setGeometry(geom);
        } else if (this.oldViewProjectionCode && this.viewProjectionCode && savedFeature.getGeometry()) {
          savedFeature.getGeometry().transform(this.oldViewProjectionCode, this.viewProjectionCode);
        }
      }
      this.addFeatures(this.savedFeatures);
    }
    this.savedFeatures = null;
  }

  private reportAll() {
    if (this.savedFeatures) {
      this.un('addfeature', this.handleAddFeature, this);
      this.addFeatures(this.savedFeatures);
      this.on('addfeature', this.handleAddFeature, this);
    }
    this.savedFeatures = null;
  }

  private setOriginal(feature: any) {
    if (!this.viewProjectionCode || !feature.getGeometry()) {
      return;
    }
    feature.un('change:geometry', this.handleChangeFeatureGeometry, this);
    feature.getGeometry().un('change', this.handleChangeGeometry, this);
    feature.set('originalProjectionCode', this.viewProjectionCode);
    feature.set('originalGeometry', feature.getGeometry());
    feature.on('change:geometry', this.handleChangeFeatureGeometry, this);
    feature.getGeometry().set('feature', feature);
    feature.getGeometry().on('change', this.handleChangeGeometry, this);
  }

  private handleAddFeature = (event: any) => {
    this.setOriginal(event.feature);
  };

  private handleChangeFeatureGeometry = (event: any) => {
    this.setOriginal(event.feature);
  };

  private handleChangeGeometry(event: any) {
    const geometry = event.target;
    const feature = geometry.get('feature');
    feature.setGeometry(geometry);
  }
}
