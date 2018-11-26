import * as React from 'react';
export interface IMapProps {
    /**
     * Content.
     */
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
    /**
     * Class name.
     */
    className?: string;
    /**
     * Keyboard Event Target.
     */
    keyboardEventTarget?: any;
}
export declare class Map extends React.Component<IMapProps, {}> {
    static defaultProps: {
        className: string;
    };
    /**
     * OpenLayers map.
     */
    private olMap;
    /**
     * OpenLayers view.
     */
    private olView;
    /**
     * Div.
     */
    private divMap;
    constructor(props: IMapProps);
    componentDidMount(): void;
    stopPropagationForComponents(): void;
    stopEventPropagation(event: any): void;
    render(): any;
}
