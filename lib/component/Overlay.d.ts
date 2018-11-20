import * as React from 'react';
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
    static contextType: React.Context<import("../Map").IMapContext>;
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
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createOverlay(): void;
    computePosition(): void;
    render(): any;
}
