import * as React from 'react';
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
    static contextType: React.Context<{
        olMap?: import("openlayers").Map;
        olGroup?: GroupLayer;
    }>;
    createOlLayer(): BaseLayer;
    render(): any;
}
