import * as React from 'react';
import * as PropTypes from 'prop-types';
import OlProjection from 'ol/proj/Projection';
import proj4 from 'proj4';
import { addProjection, transformExtent } from 'ol/proj';

export interface IProjectionProps {
  code: string;
  wkt?: string;
  lonLatValidity?: number[];
  name?: string;
  remarks?: string;
}

export class Projection extends React.Component<IProjectionProps, any> {
  public code: string;
  public wkt: string;
  public lonLatValidity: number[];
  public name: string;
  public remarks: string;
  public olProjection: OlProjection;

  public componentWillMount() {
    this.code = this.props.code;
    this.wkt = this.props.wkt;
    this.lonLatValidity = this.props.lonLatValidity;
    this.name = this.props.name;
    this.remarks = this.props.remarks;
    proj4.defs(this.code, this.wkt);
    this.olProjection = new OlProjection({
      code: this.code
    });
    addProjection(this.olProjection);
    if (Array.isArray(this.lonLatValidity)) {
      const extent = transformExtent(this.lonLatValidity, 'EPSG:4326', this.olProjection);
      this.olProjection.setExtent(extent);
    }
  }

  public render(): any {
    return null;
  }
}
