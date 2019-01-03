import OlTileWMS from 'ol/source/TileWMS';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';
export declare class TileWms extends OlTileWMS implements IExtended {
    protected label: string;
    constructor(options?: any);
    query(request: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
