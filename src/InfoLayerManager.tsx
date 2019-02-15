import * as React from 'react';
import { IBaseLayerProps, BaseLayer } from './layer/BaseLayer';

export interface IInfoLayer {
  /**
   * React BaseLayer Element.
   */
  reactBaseLayerElement: Readonly<React.ReactElement<IBaseLayerProps>>;
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
  status: Readonly<'orig_add' | 'orig_del' | 'ext_add' | 'ext_del' | 'orig_modif_by_ext' | 'orig_del_by_ext'>;
}

export interface InfoLayerManagerState {
  /**
   * Info layers changed counter.
   */
  infoLayerChangedCounter: number;
}

export class InfoLayerManager<P, S extends InfoLayerManagerState> extends React.Component<P, S> {
  private infoLayers = new Map<string, IInfoLayer>();

  constructor(props: P) {
    super(props);
    this.state = { infoLayerChangedCounter: 0 } as S;
  }

  /**
   * Get infoLayers
   */
  public getInfoLayers(
    filterFn?: (value: IInfoLayer, index: number, array: IInfoLayer[]) => boolean,
    thisFilterArg?: any
  ): IInfoLayer[] {
    const arr = Array.from(this.infoLayers.values()).filter(
      infoLayer =>
        infoLayer.status === 'orig_add' || infoLayer.status === 'ext_add' || infoLayer.status === 'orig_modif_by_ext'
    );
    return filterFn == null ? arr : arr.filter(filterFn, thisFilterArg);
  }

  /**
   * Get infoLayer
   */
  public getInfoLayer(id: string): IInfoLayer {
    return this.getInfoLayers(infoLayer => infoLayer.id == id).pop();
  }

  /**
   * Set infoLayer
   */
  public setInfoLayer(infoLayer: IInfoLayer, setStateIfChanging = true): void {
    const found = this.infoLayers.get(infoLayer.id);
    let changed = false;
    if (!found) {
      this.infoLayers.set(infoLayer.id, {
        ...infoLayer,
        status: 'ext_add'
      });
      changed = true;
    } else if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
      this.infoLayers.set(infoLayer.id, {
        ...infoLayer,
        status: 'orig_modif_by_ext'
      });
      changed = true;
    } else if (infoLayer.status === 'ext_add') {
      this.infoLayers.set(infoLayer.id, {
        ...infoLayer,
        status: 'ext_add'
      });
      changed = true;
    }
    if (setStateIfChanging && changed) {
      this.setState((state: S) => {
        return { infoLayerChangedCounter: state.infoLayerChangedCounter + 1 };
      });
    }
  }

  /**
   * Delete infoLayer
   */
  public deleteInfoLayer(id: string, setStateIfChanging = true) {
    let changed = false;
    const found = this.infoLayers.get(id);
    if (found) {
      if (found.status === 'orig_add' || found.status === 'orig_modif_by_ext') {
        this.infoLayers.set(id, {
          ...found,
          status: 'orig_del_by_ext'
        });
        changed = true;
      } else {
        this.infoLayers.delete(id);
        changed = true;
      }
    }
    if (setStateIfChanging && changed) {
      this.setState((state: S) => {
        return { infoLayerChangedCounter: state.infoLayerChangedCounter + 1 };
      });
    }
  }

  /**
   * Change infoLayer props
   */
  changeInfoLayerProps(props: IBaseLayerProps) {
    const infoLayer = this.getInfoLayer(props.id);
    if (infoLayer != null) {
      this.setInfoLayer({
        ...infoLayer,
        reactBaseLayerElement: React.cloneElement(infoLayer.reactBaseLayerElement, props)
      });
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
        if (BaseLayer.isPrototypeOf(child.type)) {
          const props = child.props as IBaseLayerProps;
          this.setInfoLayer({
            reactBaseLayerElement: child,
            status: 'orig_del',
            id: props.id,
            parentId: prevParentId
          });
        }
      });
    }
    if (nextChildren) {
      React.Children.map(nextChildren, (child: React.ReactElement<any>) => {
        if (BaseLayer.isPrototypeOf(child.type)) {
          const props = child.props as IBaseLayerProps;
          this.setInfoLayer({
            reactBaseLayerElement: child,
            status: 'orig_add',
            id: props.id,
            parentId: nextParentId
          });
        }
      });
    }
  }
}
