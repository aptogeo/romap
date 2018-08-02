import * as React from 'react';
import * as PropTypes from 'prop-types';
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
        olMap: PropTypes.Requireable<object>;
        /**
         * OpenLayers group.
         */
        olGroup: PropTypes.Requireable<object>;
    };
    getChildContext(): {
        olMap: any;
        olGroup: any;
    };
    createOlLayer(): BaseLayer;
    render(): any;
}
