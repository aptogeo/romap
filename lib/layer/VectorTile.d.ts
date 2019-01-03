import OlVectorTileLayer from 'ol/layer/VectorTile';
import OlVectorTileSource from 'ol/source/VectorTile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface IVectorTileProps extends IBaseLayerProps {
    /**
     * Source.
     */
    source: OlVectorTileSource;
    /**
     * Style.
     */
    style?: any;
}
export declare class VectorTile extends BaseLayer<IVectorTileProps, {}, OlVectorTileLayer, OlVectorTileSource> {
    createOlLayer(): OlVectorTileLayer;
    updateProps(prevProps: IVectorTileProps, nextProps: IVectorTileProps): void;
    setSource(source: OlVectorTileSource): void;
    setStyle(style: any): void;
}
