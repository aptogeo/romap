import * as React from 'react';
import * as PropTypes from 'prop-types';
import OlMap from 'ol/Map';
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
    static childContextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.Requireable<object>;
        /**
         * OpenLayers group.
         */
        olGroup: PropTypes.Requireable<object>;
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
    componentWillMount(): void;
    componentDidMount(): void;
    getChildContext(): {
        olMap: OlMap;
        olGroup: import("openlayers").layer.Group;
    };
    increaseLoadingCounter(): void;
    decreaseLoadingCounter(): void;
    render(): any;
}
