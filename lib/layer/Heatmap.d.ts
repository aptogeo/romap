import OlHeatmapLayer from 'ol/layer/Heatmap';
import OlVectorSource from 'ol/source/Vector';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface IHeatmapProps extends IBaseLayerProps {
    /**
     * Source.
     */
    source: OlVectorSource;
    /**
     * Gradient.
     */
    gradient: string[];
    /**
     * Radius.
     */
    radius: number;
    /**
     * Blur.
     */
    blur: number;
    /**
     * Shadow.
     */
    shadow: number;
    /**
     * Weight.
     */
    weight: string;
    /**
     * Render mode.
     */
    renderMode: string;
}
export declare class Heatmap extends BaseLayer<IHeatmapProps, {}, OlHeatmapLayer, OlVectorSource> {
    createOlLayer(): OlHeatmapLayer;
    updateProps(prevProps: IHeatmapProps, nextProps: IHeatmapProps): void;
    setSource(source: OlVectorSource): void;
    setGradient(gradient: string[]): void;
    setRadius(radius: number): void;
    setBlur(blur: number): void;
    setShadow(shadow: number): void;
    setWeight(weight: string): void;
    setRenderMode(renderMode: string): void;
}
