import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IVectorProps extends IBaseProps {
    /**
     * Source.
     */
    source: any;
    /**
     * Style.
     */
    style?: any;
}
export declare class Vector extends Base<IVectorProps, any> {
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IVectorProps): void;
    setStyle(style: any): void;
}
