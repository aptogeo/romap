import * as React from 'react';
import { RomapChild, IRomapChildProps } from '../RomapChild';
import { IRomapContext, romapContext } from '../RomapContext';

export interface IBaseContainerProps extends IRomapChildProps {
  /**
   * Content.
   */
  children: React.ReactNode;
}

export class BaseContainer<P extends IBaseContainerProps, S> extends RomapChild<P, S> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  public componentDidMount() {
    this.context.romapManager.updateFromChildren(this.props.id, null, this.props.children);
  }

  public componentDidUpdate(prevProps: IBaseContainerProps) {
    this.context.romapManager.updateFromChildren(this.props.id, prevProps.children, this.props.children);
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
    return this.renderChildren();
  }
}
