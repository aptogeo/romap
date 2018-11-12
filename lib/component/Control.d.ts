import * as React from 'react';
import OlControl from 'ol/control/Control';
import { IMapContext } from '../Map';
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
        olMap: () => any;
        olGroup: () => any;
    };
    context: IMapContext;
    /**
     * OpenLayers control.
     */
    private control;
    /**
     * Control div.
     */
    private controlDiv;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createControl(): void;
    render(): any;
}
