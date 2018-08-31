import OlMap from 'ol/Map';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import Feature from 'ol/Feature';

export interface IExtended extends Source {
  identify(identifyRequest: IIdentifyRequest): Promise<IIdentifyResponse>;
  getToc(): Promise<IToc>;
}

export interface IIdentifyRequest {
  olMap: OlMap,
  layer: Layer,
  pixel: [number, number];
  pixelTolerance: number;
  limit: number;
}

export interface IIdentifyResponse {
  request: IIdentifyRequest;
  features: Feature[];
}

export interface IToc {
  tocElement: ITocElement[];
}

export interface ITocElement {
  name: string;
  tocElemenLegend: ITocElementLegend[];
  tocElement: ITocElement[];
}

export interface ITocElementLegend {
  image: string;
  label: string;
}
