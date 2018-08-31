import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IVectorTileProps extends IBaseProps {
    /**
     * Source.
     */
    source: any;
    /**
     * Style.
     */
    style?: any;
}
export declare class VectorTile extends Base<IVectorTileProps, any> {
    source: any;
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IVectorTileProps): void;
    setSource(source: any): void;
    setStyle(style: any): void;
}
