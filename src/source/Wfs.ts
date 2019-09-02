import OlGeoJSON from 'ol/format/GeoJSON';
import OlProjection from 'ol/proj/Projection';
import { send, IResponse } from 'bhreq';
import { ExternalVector } from './ExternalVector';
import { IFeatureType } from './IExtended';

export class Wfs extends ExternalVector {
  protected label: string;

  protected type: IFeatureType<string>;

  constructor(options: any = {}) {
    super({
      ...options,
      format: new OlGeoJSON(),
      url: (extent: [number, number, number, number], projection: OlProjection) => {
        return `${this.getUrl()}?service=WFS&version=1.1.0&request=GetFeature&typename=${
          this.type.id
        }&outputFormat=application/json&srsname=${projection.getCode()}&bbox=${extent.join(
          ','
        )},${projection.getCode()}`;
      }
    });
    this.type = options.type ? options.type : null;
    this.label = options.label ? options.label : this.constructor.name;
  }
}
