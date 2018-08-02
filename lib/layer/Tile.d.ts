import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface ITileProps extends IBaseProps {
    /**
     * Source.
     */
    source: any;
}
export declare class Tile extends Base<ITileProps, any> {
    createOlLayer(): BaseLayer;
}
