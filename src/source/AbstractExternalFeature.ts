import { isEqual, assign } from 'lodash';
import OlFeature from 'ol/Feature';
import OlProjection from 'ol/proj/Projection';
import { AbstractFeature } from './AbstractFeature';

export class AbstractExternalFeature extends AbstractFeature {
  private projectionCode: string;

  private loadedFeatures: OlFeature[];

  private extent: [number, number, number, number];

  constructor(options?: any) {
    const opt = {};
    assign(opt, options, {
      loader: (extent: [number, number, number, number], resolution: number, projection: OlProjection) => {
        const projectionCode = projection.getCode();
        if (!isEqual(this.projectionCode, projectionCode)) {
          this.projectionCode = projectionCode;
          this.extent = null;
          this.clear();
          return;
        }
        if (this.loadedFeatures != null) {
          this.dispatchEvent('imageloadstart');
          this.addFeatures(this.loadedFeatures);
          this.dispatchEvent('imageloadend');
        }
      },
      strategy: (extent: [number, number, number, number], resolution: number) => {
        if (this.projectionCode != null && (this.extent == null || !this.containsExtent(this.extent, extent))) {
          this.dispatchEvent('imageloadstart');
          this.load(extent, this.projectionCode).then(
            (features: any) => {
              this.loadedFeatures = features;
              this.clear();
              this.dispatchEvent('imageloadend');
            },
            () => {
              this.loadedFeatures = [];
              this.clear();
              this.dispatchEvent('imageloaderror');
            }
          );
          this.extent = extent;
        }
        return [extent];
      }
    });
    super(opt);
    this.projectionCode = null;
    this.loadedFeatures = null;
  }

  public load(extent: [number, number, number, number], projectionCode: string): Promise<void | OlFeature[]> {
    return Promise.resolve([]);
  }

  public containsExtent(extent1: [number, number, number, number], extent2: [number, number, number, number]) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
  }
}
