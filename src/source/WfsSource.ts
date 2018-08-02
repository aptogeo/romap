import { isEqual, assign } from 'lodash';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { send } from '../net';

export default class WfsSource extends Vector {
  private projectionCode: any;

  private loadedFeatures: any;

  private extent: any;

  private resolution: any;

  private typename: string;

  private format: any;

  constructor(options?: any) {
    const opt = {};
    assign(opt, options, {
      useSpatialIndex: true,
      loader: (extent: any, resolution: any, projection: any) => {
        const projectionCode = projection.getCode();
        if (!isEqual(this.projectionCode, projectionCode)) {
          this.projectionCode = projectionCode;
          this.extent = null;
          this.resolution = null;
          this.clear();
          return;
        }
        if (this.loadedFeatures != null) {
          this.dispatchEvent('imageloadstart');
          this.addFeatures(this.loadedFeatures);
          this.dispatchEvent('imageloadend');
        }
      },
      strategy: (extent: any, resolution: any) => {
        if (!isEqual(this.extent, extent) || !isEqual(this.resolution, resolution)) {
          this.dispatchEvent('imageloadstart');
          if (this.projectionCode != null) {
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
          }
          this.extent = extent;
          this.resolution = resolution;
        }
        return [extent];
      }
    });

    super(opt);

    this.typename = options.typename;
    this.projectionCode = null;
    this.loadedFeatures = null;
    this.format = new GeoJSON();
  }

  public load(extent: number[], projectionCode: any) {
    const url = `${this.getUrl()}?service=WFS&version=1.1.0&request=GetFeature&typename=${
      this.typename
    }&outputFormat=application/json&srsname=${projectionCode}&bbox=${extent.join(',')},${projectionCode}`;
    return send({ url, contentType: 'application/json' }).then(
      (json: any) => this.format.readFeatures(json),
      () => {
        console.error(`Request error ${url}`);
      }
    );
  }
}
