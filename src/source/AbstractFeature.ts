import OlLayer from 'ol/layer/Layer';
import OlVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import { IExtended, IIdentifyRequest, IIdentifyResponse, IToc, ITocElement } from './IExtended';

export abstract class AbstractFeature extends OlVector implements IExtended {
  protected label: string;

  constructor(options?: any) {
    super(options);
    this.constructor.name
    this.label = options.label ? options.label : this.constructor.name;
  }

  identify(request: IIdentifyRequest): Promise<IIdentifyResponse> {
    const { olMap, layer, pixel, pixelTolerance, limit } = request;
    const features = [] as OlFeature[];
    olMap.forEachFeatureAtPixel(
      pixel,
      (feature: OlFeature) => {
        features.push(feature);
      },
      {
        layerFilter: (l: OlLayer) => {
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
    const tocElements: ITocElement[] = [];
    tocElements.push({
      name: this.label,
      tocElements: null,
      tocLegendElements: null    
    });
    return Promise.resolve<IToc>({ tocElements });
  }
}
