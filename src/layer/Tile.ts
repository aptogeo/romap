import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  public createOlLayer(): BaseLayer {
    return new TileLayer({ source: this.props.source });
  }
}
