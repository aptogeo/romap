import * as React from 'react';
import GroupLayer from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import { Base, IBaseProps } from './Base';
import { IMapContext } from '../Map'

export interface IGroupProps extends IBaseProps {
  /**
   * Content.
   */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

export class Group extends Base<IGroupProps, any> implements React.ChildContextProvider<IMapContext> {
  public static contextTypes = {
    olMap: (): any => null,
    olGroup: (): any => null
  };

  public static childContextTypes = {
    olMap: (): any => null,
    olGroup: (): any => null
  };

  public context: IMapContext;

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
