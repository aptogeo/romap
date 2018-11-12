import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import { IMapContext } from '../Map';
interface Data {
    [key: string]: any;
}
export interface IBaseProps {
    /**
     * Id.
     */
    id?: string;
    /**
     * Name.
     */
    name?: string;
    /**
     * Additional data.
     */
    data?: Data;
    /**
     * type: BASE or OVERLAY.
     */
    type?: string;
    /**
     * Extent.
     */
    extent?: number[];
    /**
     * Order position.
     */
    order?: number;
    /**
     * Default visible.
     */
    visible?: boolean;
    /**
     * Default opacity.
     */
    opacity?: number;
}
export declare class Base<P extends IBaseProps, S> extends React.Component<P, S> {
    static contextTypes: {
        olMap: () => any;
        olGroup: () => any;
    };
    context: IMapContext;
    id: string;
    name: string;
    data: Data;
    type: string;
    visible: boolean;
    opacity: number;
    extent: number[];
    order: number;
    zIndex: number;
    private olLayer;
    constructor(props: any);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: P): boolean;
    componentWillUnmount(): void;
    createOlLayer(): BaseLayer;
    checkProps(props: P): void;
    internalRemoveEvents(): void;
    internalAddEvents(): void;
    getOlLayer(): any;
    getOlSource(): any;
    setOlSource(olSource: any): any;
    setId(id: string): void;
    setName(name: any): void;
    setData(data: any): void;
    setType(type: string): void;
    setOrder(order: number): void;
    setOpacity(opacity: number): void;
    setVisible(visible: boolean): void;
    setExtent(extent: number[]): void;
    render(): any;
    private handleLoadstart;
    private handleLoadend;
    private handleLoaderror;
    private handleBaseLayerPropertychange;
}
export {};
