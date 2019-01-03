import OlTileWMS from 'ol/source/TileWMS';
import OlFeature from 'ol/Feature';
import { IExtended, IQueryRequest, IQueryResponse, IToc, ITocElement } from './IExtended';

export class TileWms extends OlTileWMS implements IExtended {
  protected label: string;

  constructor(options?: any) {
    super(options);
    this.label = options.label ? options.label : this.constructor.name;
  }

  query(request: IQueryRequest): Promise<IQueryResponse> {
    const features = [] as OlFeature[];
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
