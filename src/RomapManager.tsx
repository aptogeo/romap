import * as React from 'react';
import { RomapChild, IRomapChildProps } from './RomapChild';
import { BaseTool, IBaseToolProps } from './tool/BaseTool';
import { generateUUID } from './utils';
import { BaseLayer, IBaseLayerProps, Vector as VectorLayer } from './layer';
import { LocalVector as LocalVectorSource } from './source';

export type status = 'add' | 'modif' | 'del';

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
  parentId?: Readonly<string>;
  /**
   * Status.
   */
  status?: Readonly<status>;
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
    const arr = Array.from(this.infoElements.values()).filter(infoElement => infoElement.status !== 'del');
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
      if (infoElement.status !== 'del') {
        this.infoElements.set(infoElement.id, {
          ...infoElement,
          status: 'add'
        });
        changed = true;
      }
    } else {
      if (infoElement.status === 'del') {
        this.infoElements.set(infoElement.id, {
          ...infoElement,
          status: 'del'
        });
        changed = true;
      } else {
        this.infoElements.set(infoElement.id, {
          ...infoElement,
          status: 'modif'
        });
        if (infoElement.status === 'modif') {
          changed = true;
        }
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
    } else {
      console.error(`Element not found for id ${props.id}`);
    }
  }

  public addOrUpdateLayer(cl: React.ClassType<IBaseLayerProps, BaseLayer<IBaseLayerProps, any, any, any>, any>, props: IBaseLayerProps) {
    const id = props.id ? props.id : generateUUID();
    const name = props.name ? props.name : id;
    const source = props.source ? props.source : new LocalVectorSource({});
    this.setInfoElement({
      reactElement: React.createElement(VectorLayer, {
        id,
        name,
        source,
      }),
      id
    });
  }

  public activateTool(id: string) {
    const infoElement = this.getInfoElement(id);
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (!props.activated) {
      if (!props.independant) {
        this.getInfoElements(
          otherInfoElement =>
            otherInfoElement.id != props.id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)
        ).forEach(otherInfoElement => {
          if (!(otherInfoElement.reactElement.props as IBaseToolProps).independant) {
            this.changeInfoElementProps({ id: otherInfoElement.id, activated: false });
          }
        });
      }
      this.changeInfoElementProps({ id, activated: true });
    }
  }

  public deactivateTool(id: string) {
    const infoElement = this.getInfoElement(id);
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (props.activated) {
      this.changeInfoElementProps({ id, activated: false });
      if (!props.independant) {
        let defaultElement: IInfoElement;
        this.getInfoElements(
          otherInfoElement =>
            otherInfoElement.id != props.id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)
        ).forEach(otherInfoElement => {
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
    const toDel = new Map<string, React.ReactElement<any>>();
    if (prevChildren) {
      React.Children.map(prevChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          const props = child.props as IRomapChildProps;
          toDel.set(props.id, child);
        }
      });
    }
    if (nextChildren) {
      React.Children.map(nextChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          const props = child.props as IRomapChildProps;
          if (toDel.has(props.id)) {
            toDel.delete(props.id);
          } else {
            this.setInfoElement({
              reactElement: child,
              status: 'add',
              id: props.id,
              parentId: nextParentId
            });
          }
        }
      });
    }
    toDel.forEach((child: React.ReactElement<any>, key: string) => {
      this.setInfoElement({
        reactElement: child,
        status: 'del',
        id: key,
        parentId: nextParentId
      });
    });
  }
}
