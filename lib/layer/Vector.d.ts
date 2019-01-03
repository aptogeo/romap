import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface IVectorProps extends IBaseLayerProps {
    /**
     * Source.
     */
    source: OlVectorSource;
    /**
     * Style.
     */
    style?: any;
}
export declare class Vector extends BaseLayer<IVectorProps, {}, OlVectorLayer, OlVectorSource> {
    createOlLayer(): OlVectorLayer;
    updateProps(prevProps: IVectorProps, nextProps: IVectorProps): void;
    setSource(source: OlVectorSource): void;
    setStyle(style: any): void;
}
