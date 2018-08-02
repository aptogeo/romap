import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IDrawingProps extends IBaseProps {
    /**
     * Style.
     */
    style?: any;
}
export declare class Drawing extends Base<IDrawingProps, any> {
    style: any;
    createOlLayer(): BaseLayer;
    checkProps(props: IDrawingProps): void;
    setStyle(style: any): void;
}
