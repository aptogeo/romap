import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare class MapResizer extends React.Component<{}, {}> {
    static contextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.Requireable<object>;
    };
    componentWillMount(): void;
    updateSize(): void;
    render(): any;
}
