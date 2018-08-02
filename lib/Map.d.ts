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
export declare class Map extends React.Component<IMapProps, {}> {
    static defaultProps: {
        className: string;
    };
    static childContextTypes: {
        /**
         * OpenLayers map.
         */
        olMap: typeof OlMap;
        /**
         * OpenLayers group.
         */
        olGroup: typeof GroupLayer;
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
        olGroup: GroupLayer;
    };
    increaseLoadingCounter(): void;
    decreaseLoadingCounter(): void;
    render(): any;
}
