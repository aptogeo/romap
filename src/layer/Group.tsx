import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { mapContext, IMapContext } from '../MapContext';

export interface IGroupProps extends IBaseLayerProps {
  /**
   * Content.
   */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

export interface IGroupState {
  /**
   * Group is ready ?.
   */
  readyGroup: boolean;
}

export class Group extends BaseLayer<IGroupProps, IGroupState, OlGroupLayer, null> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  public constructor(props: IGroupProps) {
    super(props);
    this.state = { readyGroup: false };
  }

  public createOlLayer(): OlGroupLayer {
    this.setState({ readyGroup: true });
    return new OlGroupLayer();
  }

  public render(): React.ReactNode {
    if (!this.state.readyGroup) {
      return null;
    }
    return (
      <div>
        <mapContext.Provider value={{ olMap: this.context.olMap, olGroup: this.getOlLayer() }}>
          {this.props.children}
        </mapContext.Provider>
      </div>
    );
  }
}
