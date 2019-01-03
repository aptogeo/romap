import * as React from 'react';
import OlOverlay from 'ol/Overlay';
import { BaseTool, IBaseToolProps } from './BaseTool';
export interface IOverlayProps extends IBaseToolProps {
    /**
     * Content.
     */
    children?: React.ReactNode;
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
export declare class Overlay extends BaseTool<IOverlayProps, IOverlayState> {
    static defaultProps: {
        positioning: string;
        autoPan: boolean;
    };
    static contextType: React.Context<import("../MapContext").IMapContext>;
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
    constructor(props: IOverlayProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    createOverlay(): void;
    computePosition(): void;
    render(): React.ReactNode;
}
