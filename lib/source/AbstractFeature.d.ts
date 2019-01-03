import OlVector from 'ol/source/Vector';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';
export declare abstract class AbstractFeature extends OlVector implements IExtended {
    protected label: string;
    private queryGeoJSONFormat;
    constructor(options?: any);
    query(request: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
