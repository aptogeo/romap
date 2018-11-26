import * as React from 'react';
export declare class MapResizer extends React.Component<{}, {}> {
    static contextType: React.Context<{
        olMap?: import("openlayers").Map;
        olGroup?: import("openlayers").layer.Group;
    }>;
    constructor(props: {});
    updateSize(): void;
    render(): any;
}
