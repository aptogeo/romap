import * as React from 'react';
import { BaseTool, IBaseToolProps } from './BaseTool';
export interface IScaleLineProps extends IBaseToolProps {
    /**
     * Class name.
     */
    className?: string;
    /**
     * Min Width name.
     */
    minWidth?: number;
    /**
     * Internationalization
     */
    i18n?: {
        [key: string]: string;
    };
}
export declare class ScaleLine extends BaseTool<IScaleLineProps, any> {
    static defaultProps: {
        className: string;
        minWidth: number;
    };
    static contextType: React.Context<import("../MapContext").IMapContext>;
    /**
     * Div ScaleLine.
     */
    private divScaleLine;
    /**
     * Div ScaleLine Inner.
     */
    private divScaleLineInner;
    /**
     * Div ScaleLine Label.
     */
    private divScaleLineLabel;
    componentDidMount(): void;
    onViewChange: () => void;
    onResolutionChange: () => void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
