/// <reference path="../../src/custom-typings.d.ts" />
import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
import { IMapContext } from '../Map';
export interface IGroupProps extends IBaseProps {
    /**
     * Content.
     */
    children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}
export declare class Group extends Base<IGroupProps, any> implements React.ChildContextProvider<IMapContext> {
    static contextTypes: {
        olMap: () => any;
        olGroup: () => any;
    };
    static childContextTypes: {
        olMap: () => any;
        olGroup: () => any;
    };
    context: IMapContext;
    getChildContext(): {
        olMap: import("ol/Map").default;
        olGroup: any;
    };
    createOlLayer(): BaseLayer;
    render(): any;
}
