import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
import { IMapContext } from './Map';
export interface IViewProps {
    /**
     * Center.
     */
    center?: [number, number];
    zoom?: number;
    resolution?: number;
    rotation?: number;
    projection?: OlProjection | string;
}
export declare class View extends React.Component<IViewProps, any> {
    static contextTypes: {
        olMap: () => any;
        olGroup: () => any;
    };
    context: IMapContext;
    componentDidMount(): void;
    render(): any;
}
