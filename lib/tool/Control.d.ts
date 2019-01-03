import * as React from 'react';
import OlControl from 'ol/control/Control';
import { BaseTool, IBaseToolProps } from './BaseTool';
export interface IControlProps extends IBaseToolProps {
    /**
     * Content.
     */
    children?: React.ReactNode;
}
export interface IControlState {
    /**
     * Control.
     */
    control: OlControl;
}
export declare class Control extends BaseTool<IControlProps, IControlState> {
    static contextType: React.Context<import("../MapContext").IMapContext>;
    /**
     * Control div.
     */
    private controlDiv;
    constructor(props: IControlProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createControl(): void;
    render(): React.ReactNode;
}
