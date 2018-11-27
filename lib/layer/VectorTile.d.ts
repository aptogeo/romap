import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IVectorTileProps extends IBaseProps {
    /**
     * Source.
     */
    source: ol.source.VectorTile;
    /**
     * Style.
     */
    style?: any;
}
export declare class VectorTile extends Base<IVectorTileProps, any> {
    source: ol.source.VectorTile;
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IVectorTileProps): void;
    setSource(source: any): void;
    setStyle(style: any): void;
}
