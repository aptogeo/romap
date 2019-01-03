import OlImageArcGISRest from 'ol/source/ImageArcGISRest';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';
export declare class ImageArcGISRest extends OlImageArcGISRest implements IExtended {
    protected label: string;
    constructor(options?: any);
    query(request: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
