import OlVectorLayer from 'ol/layer/Vector';
import { LocalFeature } from '../source/LocalFeature';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
export interface IDrawingProps extends IBaseLayerProps {
    /**
     * Style.
     */
    style?: any;
}
export declare class Drawing extends BaseLayer<IDrawingProps, {}, OlVectorLayer, LocalFeature> {
    createOlLayer(): OlVectorLayer;
    updateProps(prevProps: IDrawingProps, nextProps: IDrawingProps): void;
    setStyle(style: any): void;
}
