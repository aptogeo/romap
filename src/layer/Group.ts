import * as React from 'react';
import * as PropTypes from 'prop-types';
import BaseLayer from 'ol/layer/Base';
import GroupLayer from 'ol/layer/Group';
import { Base, IBaseProps } from './Base';

export interface IGroupProps extends IBaseProps {
  /**
   * Content.
   */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

export class Group extends Base<IGroupProps, any> {
  public static childContextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: PropTypes.object,
    /**
     * OpenLayers group.
     */
    olGroup: PropTypes.object
  };

  public getChildContext() {
    return {
      olMap: this.context.olMap,
      olGroup: this.getOlLayer()
    };
  }

  public createOlLayer(): BaseLayer {
    return new GroupLayer();
  }

  public render(): any {
    return React.createElement('div', {}, this.props.children);
  }
}
