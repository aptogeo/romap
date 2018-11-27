import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import OlBaseLayer from 'ol/layer/Base';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { mapContext } from '../MapContext';

export interface IGroupProps extends IBaseLayerProps {
  /**
   * Content.
   */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

export class Group extends BaseLayer<IGroupProps, {}, OlGroupLayer, null> {
  public static contextType = mapContext;

  public createOlLayer(): OlGroupLayer {
    return new OlGroupLayer();
  }

  public render(): any {
    return (
      <div>
        <mapContext.Provider value={{ olGroup: this.getOlLayer() }}>{this.props.children}</mapContext.Provider>
      </div>
    );
  }
}
