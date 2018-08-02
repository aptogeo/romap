import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IImageProps extends IBaseProps {
    /**
     * Source.
     */
    source: any;
}
export declare class Image extends Base<IImageProps, any> {
    createOlLayer(): BaseLayer;
}
