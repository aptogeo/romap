import * as React from 'react';
import OlMap from 'ol/Map';
import OlControl from 'ol/control/Control';
export interface IControlProps {
    /**
     * Content.
     */
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
}
export interface IControlState {
    /**
     * Control.
     */
    control: OlControl;
}
export declare class Control extends React.Component<IControlProps, IControlState> {
    static contextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: typeof OlMap;
    };
    /**
     * OpenLayers control.
     */
    private control;
    /**
     * Control div.
     */
    private controlDiv;
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createControl(): void;
    render(): any;
}
