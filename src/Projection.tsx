import * as React from 'react';
import OlProjection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { transformExtent, get as getOlProjection } from 'ol/proj';

const projMap = new Map<string, ProjectionInfo>();

export function getProjectionInfo(code: string): ProjectionInfo {
  return projMap.get(code);
}

export function getProjectionInfos(): ProjectionInfo[] {
  const projectionInfos: ProjectionInfo[] = [];
  projMap.forEach(projectionInfo => {
    projectionInfos.push(projectionInfo);
  });
  return projectionInfos;
}

export function addProjection(
  code: string,
  wkt?: string,
  lonLatValidity?: number[],
  name?: string,
  remarks?: string
): ProjectionInfo {
  const projectionInfo = new ProjectionInfo();
  projectionInfo.code = code;
  projectionInfo.wkt = wkt;
  projectionInfo.lonLatValidity = lonLatValidity;
  projectionInfo.name = name;
  projectionInfo.remarks = remarks;
  proj4.defs(projectionInfo.code, projectionInfo.wkt);
  console.info('Register projection ' + projectionInfo.code + ' - ' + projectionInfo.name);
  register(proj4);
  projectionInfo.olProjection = getOlProjection(projectionInfo.code);
  if (Array.isArray(projectionInfo.lonLatValidity)) {
    const extent = transformExtent(projectionInfo.lonLatValidity, 'EPSG:4326', projectionInfo.olProjection);
    projectionInfo.olProjection.setExtent(extent);
  }
  projMap.set(projectionInfo.code, projectionInfo);
  return projectionInfo;
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

  constructor(props: IProjectionProps) {
    super(props);
    this.projectionInfo = addProjection(props.code, props.wkt, props.lonLatValidity, props.name, props.remarks);
  }

  public render(): React.ReactNode {
    return <div id={`projection_${this.projectionInfo.code}`} key={`projection_${this.projectionInfo.code}`}></div>;
  }
}
