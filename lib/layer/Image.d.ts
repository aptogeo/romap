import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IImageProps extends IBaseProps {
    /**
     * Source.
     */
    source: ol.source.Image;
}
export declare class Image extends Base<IImageProps, any> {
    source: ol.source.Image;
    createOlLayer(): BaseLayer;
    checkProps(props: IImageProps): void;
    setSource(source: any): void;
}
