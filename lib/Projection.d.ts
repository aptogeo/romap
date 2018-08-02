import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
export interface IProjectionProps {
    code: string;
    wkt?: string;
    lonLatValidity?: number[];
    name?: string;
    remarks?: string;
}
export declare class Projection extends React.Component<IProjectionProps, any> {
    code: string;
    wkt: string;
    lonLatValidity: number[];
    name: string;
    remarks: string;
    olProjection: OlProjection;
    componentWillMount(): void;
    render(): any;
}
