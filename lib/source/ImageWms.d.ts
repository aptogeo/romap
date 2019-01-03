import OlImageWMS from 'ol/source/ImageWMS';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';
export declare class ImageWms extends OlImageWMS implements IExtended {
    protected label: string;
    constructor(options?: any);
    query(request: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
