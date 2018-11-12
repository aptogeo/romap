import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
export declare function getProjectionInfo(code: string): ProjectionInfo;
export declare class ProjectionInfo {
    code: string;
    wkt: string;
    lonLatValidity: number[];
    name: string;
    remarks: string;
    olProjection: OlProjection;
}
export interface IProjectionProps {
    code: string;
    wkt?: string;
    lonLatValidity?: number[];
    name?: string;
    remarks?: string;
}
export declare class Projection extends React.Component<IProjectionProps, any> {
    projectionInfo: ProjectionInfo;
    constructor(props: any);
    render(): any;
}
