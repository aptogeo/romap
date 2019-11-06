import OlFeature from 'ol/Feature';
import { Vector } from './Vector';

export class LocalVector extends Vector {
  protected options: any;

  private strategy_: (extent: [number, number, number, number], resolution: number) => any;

  private origstrategy_: (extent: [number, number, number, number], resolution: number) => any;

  constructor(options?: any) {
    super({ ...options, useSpatialIndex: true });
    this.options = options;
    this.origstrategy_ = this.strategy_;
    this.strategy_ = (extent: [number, number, number, number], resolution: number) => {
      if (this.oldProjectionCode !== this.actualProjectionCode) {
        this.reproj();
      }
      return this.origstrategy_.call(this, extent, resolution);
    };
    this.on('addfeature', this.handleAddFeature);
  }

  public getSourceTypeName(): string {
    return 'LocalVector';
  }

  public getSourceOptions(): any {
    return this.options;
  }

  public isSnapshotable(): any {
    return this.options.snapshotable == null ? false : this.options.snapshotable; // false by default
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
          const extent = geom.getExtent() as [number, number, number, number];
          extents.push(extent);
          features.push(feature);
        } else {
          const extent = feature.getGeometry().getExtent() as [number, number, number, number];
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
