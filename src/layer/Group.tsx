import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { mapContext, IMapContext } from '../RomapContext';
import { IRomapChildProps } from '../RomapChild';

export interface IGroupProps extends IBaseLayerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
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

  public componentDidMount() {
    this.context.romapManager.updateFromChildren(null, this.props.children, null, this.props.id);
    super.componentDidMount();
  }

  public componentDidUpdate(prevProps: IGroupProps) {
    this.context.romapManager.updateFromChildren(prevProps.children, this.props.children, null, null);
    super.componentDidUpdate(prevProps);
  }

  public createOlLayer(): OlGroupLayer {
    this.setState({ readyGroup: true });
    return new OlGroupLayer();
  }

  public renderChildren(): React.ReactElement<IRomapChildProps>[] {
    const elems: React.ReactElement<IRomapChildProps>[] = [];
    this.context.romapManager
      .getInfoElements(infoElement => infoElement.parentId == this.props.id)
      .forEach(infoElement => {
        elems.push(React.cloneElement(infoElement.reactElement, { key: infoElement.id }));
      });
    return elems;
  }

  public render(): React.ReactNode {
    if (!this.state.readyGroup) {
      return null;
    }
    return (
      <div>
        <mapContext.Provider
          value={{
            ...this.context,
            olGroup: this.getOlLayer()
          }}
        >
          {this.renderChildren()}
        </mapContext.Provider>
      </div>
    );
  }
}
