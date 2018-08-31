import * as React from 'react';
import BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import { Base, IBaseProps } from './Base';

export interface ITileProps extends IBaseProps {
  /**
   * Source.
   */
  source: any;
}

export class Tile extends Base<ITileProps, any> {
  public source: any;

  public createOlLayer(): BaseLayer {
    return new TileLayer();
  }

  public checkProps(props: ITileProps) {
    super.checkProps(props);
    this.setSource(props.source);
  }

  public setSource(source: any) {
    this.source = source;
    if (this.source == null) {
      this.source = undefined;
    }
    this.getOlLayer().setSource(source);
  }
}
