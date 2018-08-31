import Layer from 'ol/layer/Layer';
import Vector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { IExtended, IIdentifyRequest, IIdentifyResponse, IToc } from './IExtended';

export abstract class AbstractFeature extends Vector implements IExtended {
  identify(request: IIdentifyRequest): Promise<IIdentifyResponse> {
    const { olMap, layer, pixel, pixelTolerance, limit } = request;
    const features = [] as Feature[];
    olMap.forEachFeatureAtPixel(
      pixel,
      (feature: Feature) => {
        features.push(feature);
      },
      {
        layerFilter: (l: Layer) => {
          return layer === l;
        },
        hitTolerance: pixelTolerance
      }
    );
    return Promise.resolve({
      request,
      features
    });
  }

  getToc(): Promise<IToc> {
    return Promise.resolve({
      tocElement: []
    });
  }
}
