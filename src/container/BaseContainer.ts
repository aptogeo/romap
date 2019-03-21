import * as React from 'react';
import { RomapChild, IRomapChildProps } from '../RomapChild';
import { IMapContext, mapContext } from '../RomapContext';

export interface IBaseContainerProps extends IRomapChildProps {
  /**
   * Content.
   */
  children: React.ReactNode;
}

export class BaseContainer<P extends IBaseContainerProps, S> extends RomapChild<P, S> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  public componentDidMount() {
    this.context.romapManager.updateFromChildren(null, this.props.children, null, this.props.id);
  }

  public componentDidUpdate(prevProps: IBaseContainerProps) {
    this.context.romapManager.updateFromChildren(prevProps.children, this.props.children, null, null);
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
}
