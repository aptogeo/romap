import { isEqual, assign } from 'lodash';
import Vector from 'ol/source/Vector';
import EsriJSON from 'ol/format/EsriJSON';
import { send } from '../net';

export class QueryArcGISRest extends Vector {
  private srid: number;

  private loadedFeatures: any;

  private extent: any;

  private resolution: any;

  private where: string;

  private format: any;

  constructor(options?: any) {
    const opt = {};
    assign(opt, options, {
      useSpatialIndex: true,
      loader: (extent: any, resolution: any, projection: any) => {
        // ArcGIS Server only wants the numeric portion of the projection ID.
        const srid = projection
          .getCode()
          .split(':')
          .pop();
        if (!isEqual(this.srid, srid)) {
          this.srid = srid;
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
        if (this.srid != null) {
          if (!isEqual(this.extent, extent) || !isEqual(this.resolution, resolution)) {
            this.dispatchEvent('imageloadstart');
            this.load(extent, this.srid).then(
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
        }
        this.extent = extent;
        this.resolution = resolution;
        return [extent];
      }
    });

    super(opt);

    this.where = options.where;
    this.srid = null;
    this.loadedFeatures = null;
    this.format = new EsriJSON();
  }

  public load(extent: any, srid: any) {
    const geometry = encodeURIComponent(
      `{"xmin":${extent[0]},"ymin":${extent[1]},"xmax":${extent[2]},"ymax":${
        extent[3]
      },"spatialReference":{"wkid":${srid}}}`
    );
    let url = `${this.getUrl()}/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=${geometry}&geometryType=esriGeometryEnvelope&inSR=${srid}&outFields=*&outSR=${srid}`;
    if (this.where) {
      url += `&where=${this.where}`;
    }
    return send({ url, contentType: 'application/json' }).then(
      (json: any) => this.format.readFeatures(json),
      () => {
        console.error(`Request error ${url}`);
      }
    );
  }
}
