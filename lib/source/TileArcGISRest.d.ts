import OlTileArcGISRest from 'ol/source/TileArcGISRest';
import { IExtended, IQueryRequest, IQueryResponse, IToc } from './IExtended';
export declare class TileArcGISRest extends OlTileArcGISRest implements IExtended {
    protected label: string;
    constructor(options?: any);
    query(request: IQueryRequest): Promise<IQueryResponse>;
    getToc(): Promise<IToc>;
}
