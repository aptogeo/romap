import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
export interface IGroupProps extends IBaseProps {
    /**
     * Content.
     */
    children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}
export declare class Group extends Base<IGroupProps, any> {
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
    getChildContext(): {
        olMap: any;
        olGroup: any;
    };
    createOlLayer(): BaseLayer;
    render(): any;
}
