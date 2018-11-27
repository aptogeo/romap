import { isEqual, assign } from 'lodash';
import OlProjection from 'ol/proj/Projection';
import { AbstractFeature } from './AbstractFeature';

export class LocalFeature extends AbstractFeature {
  protected savedFeatures: any;

  protected oldViewProjection: any;

  protected viewProjection: any;

  protected lastExtent: any;

  protected lastResolution: any;

  protected optionLoader: any;

  protected optionStrategy: any;

  constructor(options?: any) {
    super(
      assign({}, options, {
        loader: (extent: any, resolution: any, projection: any) => {
          if (!isEqual(projection, this.viewProjection)) {
            this.oldViewProjection = this.viewProjection;
            this.viewProjection = projection;
            this.projectAll();
          } else {
            this.reportAll();
          }
          if (this.optionLoader) {
            this.optionLoader.call(this, extent, resolution, projection);
          }
        },
        strategy: (extent: any, resolution: any) => {
          const features = this.getFeatures();
          if (
            !isEqual(this.lastExtent, extent) ||
            !isEqual(this.lastResolution, resolution) ||
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
      })
    );
    this.optionLoader = options.loader;
    this.optionStrategy = options.strategy;
    this.on('addfeature', this.handleAddFeature, this);
    this.viewProjection = null;
    this.oldViewProjection = null;
    this.savedFeatures = null;
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
        if (savedFeature.get('originalProjection') && savedFeature.get('originalGeometry') && this.viewProjection) {
          const geom = savedFeature.get('originalGeometry').clone();
          geom.transform(savedFeature.get('originalProjection'), this.viewProjection);
          savedFeature.setGeometry(geom);
        } else if (this.oldViewProjection && this.viewProjection && savedFeature.getGeometry()) {
          savedFeature.getGeometry().transform(this.oldViewProjection, this.viewProjection);
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
    if (!this.viewProjection || !feature.getGeometry()) {
      return;
    }
    feature.un('change:geometry', this.handleChangeFeatureGeometry, this);
    feature.getGeometry().un('change', this.handleChangeGeometry, this);
    feature.set('originalProjection', new OlProjection({ code: this.viewProjection.getCode() }));
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
