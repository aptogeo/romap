import * as React from 'react';
import * as PropTypes from 'prop-types';
import OlProjection from 'ol/proj/Projection';
export interface IViewProps {
    /**
     * Center.
     */
    center?: [number, number];
    zoom?: number;
    resolution?: number;
    rotation?: number;
    olProjection?: OlProjection | string;
}
export declare class View extends React.Component<IViewProps, any> {
    static contextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.Requireable<object>;
    };
    componentDidMount(): void;
    render(): any;
}
