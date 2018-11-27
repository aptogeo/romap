import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface ITileProps extends IBaseProps {
    /**
     * Source.
     */
    source: ol.source.Tile;
}
export declare class Tile extends Base<ITileProps, any> {
    source: ol.source.Tile;
    createOlLayer(): BaseLayer;
    checkProps(props: ITileProps): void;
    setSource(source: any): void;
}
