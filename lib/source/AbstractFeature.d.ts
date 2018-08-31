import Vector from 'ol/source/Vector';
import { IExtended, IIdentifyRequest, IIdentifyResponse, IToc } from './IExtended';
export declare abstract class AbstractFeature extends Vector implements IExtended {
    identify(request: IIdentifyRequest): Promise<IIdentifyResponse>;
    getToc(): Promise<IToc>;
}
