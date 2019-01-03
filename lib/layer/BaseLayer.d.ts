import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlSource from 'ol/source/Source';
import { IMapContext } from '../MapContext';
export interface IBaseLayerProps {
    /**
     * Id.
     */
    id?: string;
    /**
     * Name.
     */
    name?: string;
    /**
     * type: BASE or OVERLAY.
     */
    type?: string;
    /**
     * Extent.
     */
    extent?: [number, number, number, number];
    /**
     * Order position.
     */
    order?: number;
    /**
     * Visible.
     */
    visible?: boolean;
    /**
     * Opacity.
     */
    opacity?: number;
}
export declare class BaseLayer<P extends IBaseLayerProps, S, OLL extends OlBaseLayer, OLS extends OlSource> extends React.Component<P, S> {
    static contextType: React.Context<IMapContext>;
    context: IMapContext;
    private olLayer;
    componentDidMount(): void;
    componentDidUpdate(prevProps: P): void;
    componentWillUnmount(): void;
    createOlLayer(): OLL;
    updateProps(prevProps: P, nextProps: P): void;
    internalRemoveEvents(): void;
    internalAddEvents(): void;
    getOlLayer(): OLL;
    getOlSource(): OLS;
    setOlSource(olSource: any): any;
    setId(id: string): void;
    setName(name: string): void;
    setType(type: string): void;
    setOrder(order: number, type: string): void;
    setOpacity(opacity: number): void;
    setVisible(visible: boolean): void;
    setExtent(extent: [number, number, number, number]): void;
    setProps(props: P): void;
    private handleBaseLayerPropertychange;
    render(): React.ReactNode;
}
