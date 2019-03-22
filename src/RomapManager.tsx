import * as React from 'react';
import { RomapChild, IRomapChildProps } from './RomapChild';
import { BaseTool, IBaseToolProps } from './tool/BaseTool';

export type status = 'orig_add' | 'orig_del' | 'ext_add' | 'ext_del' | 'orig_modif_by_ext' | 'orig_del_by_ext';

export interface IInfoElement {
  /**
   * React Element.
   */
  reactElement: Readonly<React.ReactElement>;
  /**
   * Id.
   */
  id: Readonly<string>;
  /**
   * Parent layer id.
   */
  parentId: Readonly<string>;
  /**
   * Status.
   */
  status: Readonly<status>;
}

export interface RomapManagerState {
  /**
   * Changed counter.
   */
  changedCounter: number;
}

export class RomapManager<P, S extends RomapManagerState> extends React.Component<P, S> {
  private infoElements = new Map<string, IInfoElement>();

  constructor(props: P) {
    super(props);
    this.state = { changedCounter: 0 } as S;
  }

  /**
   * Get infoElements
   */
  public getInfoElements(
    filterFn?: (value: IInfoElement, index: number, array: IInfoElement[]) => boolean,
    thisFilterArg?: any
  ): IInfoElement[] {
    const arr = Array.from(this.infoElements.values()).filter(
      infoElement =>
        infoElement.status === 'orig_add' ||
        infoElement.status === 'ext_add' ||
        infoElement.status === 'orig_modif_by_ext'
    );
    return filterFn == null ? arr : arr.filter(filterFn, thisFilterArg);
  }

  /**
   * Get infoElement
   */
  public getInfoElement(id: string): IInfoElement {
    return this.getInfoElements(infoElement => infoElement.id == id).pop();
  }

  /**
   * Set infoElement
   */
  public setInfoElement(infoElement: IInfoElement, setStateIfChanging = true): void {
    const found = this.infoElements.get(infoElement.id);
    let changed = false;
    if (!found) {
      this.infoElements.set(infoElement.id, {
        ...infoElement,
        status: 'ext_add'
      });
      changed = true;
    } else if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
      this.infoElements.set(infoElement.id, {
        ...infoElement,
        status: 'orig_modif_by_ext'
      });
      changed = true;
    } else if (infoElement.status === 'ext_add') {
      this.infoElements.set(infoElement.id, {
        ...infoElement,
        status: 'ext_add'
      });
      changed = true;
    }
    if (setStateIfChanging && changed) {
      this.setState((state: S) => {
        return { changedCounter: state.changedCounter + 1 };
      });
    }
  }

  /**
   * Delete infoElement
   */
  public deleteInfoElement(id: string, setStateIfChanging = true) {
    let changed = false;
    const found = this.infoElements.get(id);
    if (found) {
      if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
        this.infoElements.set(id, {
          ...found,
          status: 'orig_del_by_ext'
        });
        changed = true;
      } else {
        this.infoElements.delete(id);
        changed = true;
      }
    }
    if (setStateIfChanging && changed) {
      this.setState((state: S) => {
        return { changedCounter: state.changedCounter + 1 };
      });
    }
  }

  /**
   * Change infoElement props
   */
  public changeInfoElementProps(props: any) {
    const infoElement = this.getInfoElement(props.id);
    if (infoElement != null) {
      this.setInfoElement({
        ...infoElement,
        reactElement: React.cloneElement(infoElement.reactElement, props)
      });
    }
  }

  public activateTool(id: string) {
    const infoElement = this.getInfoElement(id);
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (!props.activated) {
      if (!props.independant) {
        this.getInfoElements(otherInfoElement => (otherInfoElement.id != props.id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)))
          .forEach(otherInfoElement => {
            if (!(otherInfoElement.reactElement.props as IBaseToolProps).independant) {
              this.changeInfoElementProps({ id: otherInfoElement.id, activated: false });
            }
          });
      }
      this.changeInfoElementProps({ id, activated: true });
    }
  }

  public deactivateTool(id: string, force = false) {
    const infoElement = this.getInfoElement(id);
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (props.activated) {
      this.changeInfoElementProps({ id, activated: false });
      if (!props.independant) {
        let defaultElement: IInfoElement;
        this.getInfoElements(otherInfoElement => (otherInfoElement.id != props.id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)))
          .forEach(otherInfoElement => {
            if (!(otherInfoElement.reactElement.props as IBaseToolProps).independant) {
              this.changeInfoElementProps({ id: otherInfoElement.id, activated: false });
              defaultElement = otherInfoElement;
            }
          });
        if (defaultElement != null) {
          this.activateTool(defaultElement.id);
        }
      }
    }
  }

  public updateFromChildren(
    prevChildren: React.ReactNode,
    nextChildren: React.ReactNode,
    prevParentId: string,
    nextParentId: string
  ) {
    if (prevChildren) {
      React.Children.map(prevChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          const props = child.props as IRomapChildProps;
          this.setInfoElement({
            reactElement: child,
            status: 'orig_del',
            id: props.id,
            parentId: prevParentId
          });
        }
      });
    }
    if (nextChildren) {
      React.Children.map(nextChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          const props = child.props as IRomapChildProps;
          this.setInfoElement({
            reactElement: child,
            status: 'orig_add',
            id: props.id,
            parentId: nextParentId
          });
        }
      });
    }
  }
}
