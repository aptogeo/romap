import OlImageLayer from 'ol/layer/Image';
import OlImageSource from 'ol/source/Image';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface IImageProps extends IBaseLayerProps {
    /**
     * Source.
     */
    source: OlImageSource;
}
export declare class Image extends BaseLayer<IImageProps, {}, OlImageLayer, OlImageSource> {
    createOlLayer(): OlImageLayer;
    updateProps(prevProps: IImageProps, nextProps: IImageProps): void;
    setSource(source: OlImageSource): void;
}
