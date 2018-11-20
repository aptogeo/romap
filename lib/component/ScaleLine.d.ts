import * as React from 'react';
export interface IScaleLineProps {
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
export declare class ScaleLine extends React.Component<IScaleLineProps, any> {
    static defaultProps: {
        className: string;
        minWidth: number;
    };
    static contextType: React.Context<import("../Map").IMapContext>;
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
    render(): any;
}
