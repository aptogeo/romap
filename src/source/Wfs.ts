import GeoJSON from 'ol/format/GeoJSON';
import { send, IResponse } from '../net';
import { AbstractExternalFeature } from './AbstractExternalFeature';

export class Wfs extends AbstractExternalFeature {
  private typename: string;

  private format: any;

  constructor(options?: any) {
    super(options);
    this.typename = options.typename;
    this.format = new GeoJSON();
  }

  public load(extent: number[], projectionCode: string) {
    const url = `${this.getUrl()}?service=WFS&version=1.1.0&request=GetFeature&typename=${
      this.typename
    }&outputFormat=application/json&srsname=${projectionCode}&bbox=${extent.join(',')},${projectionCode}`;
    return send({ url, contentType: 'application/json' }).then(
      (response: IResponse) => this.format.readFeatures(response.body),
      () => {
        console.error(`Request error ${url}`);
      }
    );
  }
}
