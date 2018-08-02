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
export declare class Vector extends Base<IVectorTileProps, any> {
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IVectorTileProps): void;
    setStyle(style: any): void;
}
