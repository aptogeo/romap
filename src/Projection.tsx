import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { transformExtent, get as getOlProjection } from 'ol/proj';

const projMap = new Map<string, ProjectionInfo>();

export function getProjectionInfo(code: string): ProjectionInfo {
  return projMap.get(code);
}

export class ProjectionInfo {
  public code: string;
  public wkt: string;
  public lonLatValidity: number[];
  public name: string;
  public remarks: string;
  public olProjection: OlProjection;
}

export interface IProjectionProps {
  code: string;
  wkt?: string;
  lonLatValidity?: number[];
  name?: string;
  remarks?: string;
}

export class Projection extends React.Component<IProjectionProps, any> {
  public projectionInfo: ProjectionInfo;

  public componentWillMount() {
    this.projectionInfo = new ProjectionInfo();
    this.projectionInfo.code = this.props.code;
    this.projectionInfo.wkt = this.props.wkt;
    this.projectionInfo.lonLatValidity = this.props.lonLatValidity;
    this.projectionInfo.name = this.props.name;
    this.projectionInfo.remarks = this.props.remarks;
    proj4.defs(this.projectionInfo.code, this.projectionInfo.wkt);
    console.info('Register projection ' + this.projectionInfo.code + ' - ' + this.projectionInfo.name);
    register(proj4);
    this.projectionInfo.olProjection = getOlProjection(this.projectionInfo.code);
    if (Array.isArray(this.projectionInfo.lonLatValidity)) {
      const extent = transformExtent(this.projectionInfo.lonLatValidity, 'EPSG:4326', this.projectionInfo.olProjection);
      this.projectionInfo.olProjection.setExtent(extent);
    }
    projMap.set(this.projectionInfo.code, this.projectionInfo);
  }

  public render(): any {
    return null;
  }
}
