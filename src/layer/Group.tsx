import * as React from 'react';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
import { mapContext } from '../MapContext';

export interface IGroupProps extends IBaseProps {
  /**
   * Content.
   */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

export class Group extends Base<IGroupProps, any> {
  public static contextType = mapContext;

  public createOlLayer(): BaseLayer {
    return new GroupLayer();
  }

  public render(): any {
    return (
      <div>
        <mapContext.Provider value={{ olGroup: this.getOlLayer() }}>{this.props.children}</mapContext.Provider>
      </div>
    );
  }
}
