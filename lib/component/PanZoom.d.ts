import * as React from 'react';
export interface IPanZoomProps {
    /**
     * Class name.
     */
    className?: string;
    /**
     * Show Zoom
     */
    showZoom?: boolean;
    /**
     * Show Zoom Slider
     */
    showZoomSlider?: boolean;
    /**
     * Show Pan
     */
    showPan?: boolean;
    /**
     * Show Origin
     */
    showOrigin?: boolean;
    /**
     * Show Rotation
     */
    showRotation?: boolean;
    /**
     * Internationalization
     */
    i18n?: {
        [key: string]: string;
    };
}
export declare class PanZoom extends React.Component<IPanZoomProps, any> {
    static defaultProps: {
        className: string;
        showZoom: boolean;
        showZoomSlider: boolean;
        showPan: boolean;
        showOrigin: boolean;
        showRotation: boolean;
    };
    static contextType: React.Context<{
        olMap?: import("openlayers").Map;
        olGroup?: import("openlayers").layer.Group;
    }>;
    /**
     * Origin.
     */
    private origin;
    /**
     * Button Rotate.
     */
    private buttonRotate;
    /**
     * Span Rotate.
     */
    private spanRotate;
    /**
     * Container thumb.
     */
    private containerThumb;
    /**
     * Btn thumb.
     */
    private btnThumb;
    componentDidMount(): void;
    onViewChange: () => void;
    onResolutionChange: () => void;
    handleZoom: () => void;
    handleUnzoom: () => void;
    handleOrigin: () => void;
    handleLeft: () => void;
    handleRight: () => void;
    handleUp: () => void;
    handleDown: () => void;
    handleResetRotation: () => void;
    pan(deltaX: number, deltaY: number): void;
    zoom(delta: number): void;
    renderPan(): any;
    renderZoom(): any;
    renderRotation(): any;
    render(): any;
}
