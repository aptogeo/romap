import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { IMapContext } from '../MapContext';
export interface IGroupProps extends IBaseLayerProps {
    /**
     * Content.
     */
    children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}
export interface IGroupState {
    /**
     * Group is ready ?.
     */
    readyGroup: boolean;
}
export declare class Group extends BaseLayer<IGroupProps, IGroupState, OlGroupLayer, null> {
    static contextType: React.Context<IMapContext>;
    context: IMapContext;
    constructor(props: IGroupProps);
    createOlLayer(): OlGroupLayer;
    render(): React.ReactNode;
}
