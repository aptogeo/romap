import OlFeature from 'ol/Feature';
import { Vector } from './Vector';

export class LocalVector extends Vector {
  private strategy_: (extent: [number, number, number, number], resolution: number) => any;

  private origstrategy_: (extent: [number, number, number, number], resolution: number) => any;

  constructor(options?: any) {
    super({ ...options, useSpatialIndex: true });
    this.origstrategy_ = this.strategy_;
    this.strategy_ = (extent: [number, number, number, number], resolution: number) => {
      if (this.oldProjectionCode !== this.actualProjectionCode) {
        this.reproj();
      }
      return this.origstrategy_.call(this, extent, resolution);
    };
    this.on('addfeature', this.handleAddFeature);
    this.oldProjectionCode = null;
    this.actualProjectionCode = null;
    this.label = options.label ? options.label : this.constructor.name;
  }

  private reproj() {
    const features: OlFeature[] = [];
    const extents: [number, number, number, number][] = [];
    this.forEachFeature((feature: OlFeature) => {
      if (feature.getGeometry() != null) {
        const originalProjectionCode = feature.get('originalProjectionCode');
        const originalGeometry = feature.get('originalGeometry');
        if (
          originalProjectionCode != null &&
          originalGeometry != null &&
          originalProjectionCode !== this.actualProjectionCode
        ) {
          const geom = originalGeometry.clone();
          geom.transform(feature.get('originalProjection'), this.actualProjectionCode);
          feature.set(feature.getGeometryName(), geom, true);
          const extent = geom.getExtent();
          extents.push(extent);
          features.push(feature);
        }
      }
      return null;
    });
    if ((this as any).featuresRtree_) {
      (this as any).featuresRtree_.clear();
      (this as any).featuresRtree_.load(extents, features);
    }
  }

  private setOriginal(feature: any) {
    if (feature.getGeometry() == null) {
      return;
    }
    const geometry = feature.getGeometry();
    feature.set('originalProjectionCode', this.actualProjectionCode, true);
    feature.set('originalGeometry', geometry, true);
    geometry.set('feature', feature, true);
    feature.once('change:geometry', this.handleChangeFeatureGeometry, this);
    geometry.once('change', this.handleChangeGeometry, this);
  }

  private handleAddFeature = (event: any) => {
    const feature = event.feature;
    if (feature != null) {
      this.setOriginal(feature);
    }
  };

  private handleChangeFeatureGeometry = (event: any) => {
    const feature = event.feature;
    if (feature != null) {
      this.setOriginal(feature);
    }
  };

  private handleChangeGeometry(event: any) {
    const geometry = event.target;
    if (geometry != null) {
      const feature = geometry.get('feature');
      if (feature != null) {
        feature.set(feature.getGeometryName(), geometry, true);
        this.setOriginal(feature);
      }
    }
  }
}
