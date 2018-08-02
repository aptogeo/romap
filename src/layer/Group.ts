import * as React from 'react';
import OlMap from 'ol/Map';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
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
    olMap: OlMap,
    /**
     * OpenLayers group.
     */
    olGroup: GroupLayer
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
