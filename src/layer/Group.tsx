import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { romapContext, IRomapContext } from '../RomapContext';
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
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  public constructor(props: IGroupProps) {
    super(props);
    this.state = { readyGroup: false };
  }

  public componentDidMount() {
    this.context.romapManager.updateFromChildren(this.props.id, null, this.props.children);
    super.componentDidMount();
  }

  public componentDidUpdate(prevProps: IGroupProps) {
    this.context.romapManager.updateFromChildren(this.props.id, prevProps.children, this.props.children);
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
        elems.push(React.cloneElement(infoElement.reactElement));
      });
    return elems;
  }

  public render(): React.ReactNode {
    if (!this.state.readyGroup) {
      return null;
    }
    return (
      <div>
        <romapContext.Provider
          value={{
            ...this.context,
            olGroup: this.getOlLayer()
          }}
        >
          {this.renderChildren()}
        </romapContext.Provider>
      </div>
    );
  }
}
