import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IVectorProps extends IBaseProps {
    /**
     * Source.
     */
    source: ol.source.Vector;
    /**
     * Style.
     */
    style?: any;
}
export declare class Vector extends Base<IVectorProps, any> {
    source: ol.source.Vector;
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IVectorProps): void;
    setSource(source: any): void;
    setStyle(style: any): void;
}
