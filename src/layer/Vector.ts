import * as React from 'react';
import * as PropTypes from 'prop-types';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { Base, IBaseProps } from './Base';

export interface IVectorProps extends IBaseProps {
  /**
   * Source.
   */
  source: any;
  /**
   * Style.
   */
  style?: any;
}

export class Vector extends Base<IVectorProps, any> {
  public style: any;

  public createOlLayer(): BaseLayer {
    return new VectorLayer({ source: this.props.source });
  }

  public checkProps(props: IVectorProps) {
    super.checkProps(props);
    this.setStyle(props.style);
  }

  public setStyle(style: any) {
    this.style = style;
    if (this.style == null) {
      this.style = undefined;
    }
    this.getOlLayer().setStyle(style);
  }
}
