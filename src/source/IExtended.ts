import OlMap from 'ol/Map';
import OlLayer from 'ol/layer/Layer';
import OlSource from 'ol/source/Source';
import OlFeature from 'ol/Feature';

export interface IExtended extends OlSource {
  identify(identifyRequest: IIdentifyRequest): Promise<IIdentifyResponse>;
  getToc(): Promise<IToc>;
}

export interface IIdentifyRequest {
  olMap: OlMap;
  layer: OlLayer;
  pixel: [number, number];
  pixelTolerance: number;
  limit: number;
}

export interface IIdentifyResponse {
  request: IIdentifyRequest;
  features: OlFeature[];
}

export interface IToc {
  tocElements: ITocElement[];
}

export interface ITocElement {
  name: string;
  tocLegendElements?: ITocLegendElement[];
  tocElements?: ITocElement[];
}

export interface ITocLegendElement {
  image: string;
  label: string;
}
