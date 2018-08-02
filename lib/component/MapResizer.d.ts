import * as React from 'react';
import OlMap from 'ol/Map';
export declare class MapResizer extends React.Component<{}, {}> {
    static contextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: typeof OlMap;
    };
    componentWillMount(): void;
    updateSize(): void;
    render(): any;
}
