import EsriJSON from 'ol/format/EsriJSON';
import { send, IResponse } from '../net';
import { AbstractExternalFeature } from './AbstractExternalFeature';

export class QueryArcGISRest extends AbstractExternalFeature {
  private where: string;

  private format: any;

  constructor(options?: any) {
    super(options);
    this.where = options.where;
    this.format = new EsriJSON();
  }

  public load(extent: any, projectionCode: string) {
    const srid = projectionCode.split(':').pop();
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
      (response: IResponse) => this.format.readFeatures(response.body),
      () => {
        console.error(`Request error ${url}`);
      }
    );
  }
}
