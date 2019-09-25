import * as React from 'react';
import { RomapChild } from './RomapChild';
import { BaseTool, IBaseToolProps } from './tool/BaseTool';
import { BaseLayer, IBaseLayerProps, Vector as VectorLayer } from './layer';
import { LocalVector as LocalVectorSource } from './source';
import { generateUUID } from './utils';

export type infoElementStatus = null | 'add' | 'modif' | 'del';

export interface IInfoElement {
  /**
   * React Element.
   */
  reactElement: Readonly<React.ReactElement>;
  /**
   * Original React Element.
   */
  originalReactElement: Readonly<React.ReactElement>;
  /**
   * Id.
   */
  id: Readonly<React.Key>;
  /**
   * Parent layer id.
   */
  parentId: Readonly<React.Key>;
  /**
   * Status.
   */
  status: Readonly<infoElementStatus>;
}

export interface RomapManagerState {
  /**
   * Changed counter.
   */
  changedCounter: number;
}

export class RomapManager<P, S extends RomapManagerState> extends React.Component<P, S> {
  private infoElements = new Map<React.Key, IInfoElement>();

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
  public changeInfoElementProps(id: React.Key, props: any) {
    const infoElement = this.getInfoElements(infoElement => infoElement.id == id).pop();
    if (infoElement != null) {
      this.setInfoElement({
        ...infoElement,
        reactElement: React.cloneElement(infoElement.reactElement, props)
      });
    } else {
      console.error(`Element not found for id ${id}`);
    }
  }

  public addOrUpdateLayer(
    id: React.Key,
    cl: React.ClassType<IBaseLayerProps, BaseLayer<IBaseLayerProps, any, any, any>, any>,
    props: IBaseLayerProps
  ) {
    const source = props.source ? props.source : new LocalVectorSource({});
    this.setInfoElement({
      reactElement: React.createElement(VectorLayer, {
        key: id,
        id: id,
        source,
        name: props.name
      }),
      originalReactElement: null,
      id: id,
      parentId: 'map',
      status: null
    });
  }

  public activateTool(id: React.Key) {
    const infoElement = this.getInfoElements(infoElement => infoElement.id == id).pop();
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      console.error(`Element not found for id ${id}`);
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (!props.activated) {
      if (!props.independant) {
        this.getInfoElements(
          otherInfoElement => otherInfoElement.id != id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)
        ).forEach(otherInfoElement => {
          if (!(otherInfoElement.reactElement.props as IBaseToolProps).independant) {
            this.changeInfoElementProps(otherInfoElement.id, { activated: false });
          }
        });
      }
      this.changeInfoElementProps(id, { activated: true });
    }
  }

  public deactivateTool(id: React.Key) {
    const infoElement = this.getInfoElements(infoElement => infoElement.id == id).pop();
    if (infoElement == null || !BaseTool.isPrototypeOf(infoElement.reactElement.type)) {
      console.error(`Element not found for id ${id}`);
      return;
    }
    const props = infoElement.reactElement.props as IBaseToolProps;
    if (props.activated) {
      this.changeInfoElementProps(id, { activated: false });
      if (!props.independant) {
        let defaultElement: IInfoElement;
        this.getInfoElements(
          otherInfoElement => otherInfoElement.id != id && BaseTool.isPrototypeOf(otherInfoElement.reactElement.type)
        ).forEach(otherInfoElement => {
          if (!(otherInfoElement.reactElement.props as IBaseToolProps).independant) {
            this.changeInfoElementProps(otherInfoElement.id, { activated: false });
            defaultElement = otherInfoElement;
          }
        });
        if (defaultElement != null) {
          this.activateTool(defaultElement.id);
        }
      }
    }
  }

  public updateFromChildren(parentId: React.Key, prevChildren: React.ReactNode, nextChildren: React.ReactNode) {
    const toDel = new Map<React.Key, React.ReactElement<any>>();
    // Previous children
    if (prevChildren) {
      React.Children.map(prevChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          if (child.props.id != null) {
            toDel.set(child.props.id, child);
          }
        }
      });
    }
    // Next children
    if (nextChildren) {
      React.Children.map(nextChildren, (child: React.ReactElement<any>) => {
        if (RomapChild.isPrototypeOf(child.type)) {
          let id = child.props.id;
          // id is null: search element
          if (id == null) {
            this.infoElements.forEach(infoElement => {
              if (child === infoElement.originalReactElement) {
                id = infoElement.reactElement.key;
              }
            });
          }
          // id is null: generate
          if (id == null) {
            id = generateUUID();
          }
          if (toDel.has(id)) {
            toDel.delete(id);
          }
          const infoElement = this.getInfoElements(infoElement => infoElement.id == id).pop();
          let props = {};
          let status: infoElementStatus = 'add';
          if (infoElement != null) {
            props = infoElement.reactElement.props;
            status = infoElement.status;
          }
          const element = React.cloneElement(child, { ...props, key: id, id });
          this.setInfoElement({
            reactElement: element,
            originalReactElement: child,
            status,
            id,
            parentId
          });
        }
      });
    }
    // Set status to 'del' removed children
    toDel.forEach((child: React.ReactElement<any>, id: string) => {
      this.setInfoElement({
        reactElement: child,
        originalReactElement: child,
        status: 'del',
        id,
        parentId
      });
    });
  }
}
