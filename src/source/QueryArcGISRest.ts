import OlEsriJSON from 'ol/format/EsriJSON';
import { send, IResponse } from 'bhreq';
import { ExternalVector } from './ExternalVector';
import { IFeatureType } from './IExtended';

export class QueryArcGISRest extends ExternalVector {
  protected where: string;

  private esriJSONFormat = new OlEsriJSON();

  protected type: IFeatureType<number>;

  constructor(options: any = {}) {
    super(options);
    this.type = options.type ? options.type : null;
    this.label = options.label ? options.label : this.constructor.name;
  }

  public load(extent: [number, number, number, number], projectionCode: string) {
    const srid = projectionCode.split(':').pop();
    const geometry = encodeURIComponent(
      `{"xmin":${extent[0]},"ymin":${extent[1]},"xmax":${extent[2]},"ymax":${extent[3]},"spatialReference":{"wkid":${srid}}}`
    );
    let url = `${this.getUrl()}/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=${geometry}&geometryType=esriGeometryEnvelope&inSR=${srid}&outFields=*&outSR=${srid}`;
    if (this.where) {
      url += `&where=${this.where}`;
    }
    return send({ url, contentType: 'application/json' }).then(
      (response: IResponse) => this.esriJSONFormat.readFeatures(response.body),
      () => {
        console.error(`Request error ${url}`);
      }
    );
  }
}
