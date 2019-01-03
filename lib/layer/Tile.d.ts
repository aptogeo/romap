import OlTileLayer from 'ol/layer/Tile';
import OlTileSource from 'ol/source/Tile';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface ITileProps extends IBaseLayerProps {
    /**
     * Source.
     */
    source: OlTileSource;
}
export declare class Tile extends BaseLayer<ITileProps, {}, OlTileLayer, OlTileSource> {
    createOlLayer(): OlTileLayer;
    updateProps(prevProps: ITileProps, nextProps: ITileProps): void;
    setSource(source: OlTileSource): void;
}
