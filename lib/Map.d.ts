import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
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
export interface IMapContext {
    /**
     * OpenLayers map.
     */
    olMap?: OlMap;
    /**
     * OpenLayers group.
     */
    olGroup?: GroupLayer;
}
export declare const mapContext: React.Context<IMapContext>;
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
    constructor(props: any);
    componentDidMount(): void;
    increaseLoadingCounter(): void;
    decreaseLoadingCounter(): void;
    render(): any;
}
