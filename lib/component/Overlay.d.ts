import * as React from 'react';
import OlMap from 'ol/Map';
import OlOverlay from 'ol/Overlay';
export interface IOverlayProps {
    /**
     * Content.
     */
    children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
    /**
     * Positioning.
     */
    positioning?: string;
    /**
     * Position.
     */
    position?: [number, number];
    /**
     * Autopan.
     */
    autoPan?: boolean;
}
export interface IOverlayState {
    /**
     * Overlay.
     */
    overlay: OlOverlay;
}
export declare class Overlay extends React.Component<IOverlayProps, IOverlayState> {
    static defaultProps: {
        positioning: string;
        autoPan: boolean;
    };
    static contextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: typeof OlMap;
    };
    /**
     * Overlay div.
     */
    private overlayDiv;
    /**
     * Old position X.
     */
    private oldPositionX;
    /**
     * Old position Y.
     */
    private oldPositionY;
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createOverlay(): void;
    computePosition(): void;
    render(): any;
}
