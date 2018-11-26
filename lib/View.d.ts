import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
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
    static contextType: React.Context<{
        olMap?: import("openlayers").Map;
        olGroup?: import("openlayers").layer.Group;
    }>;
    componentDidMount(): void;
    render(): any;
}
