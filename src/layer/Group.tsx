import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { mapContext, IMapContext, IInfoLayer } from '../RomapContext';
import { mountInfoLayers, updateInfoLayers } from '../utils';

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
  /**
   * Info layers.
   */
  //infoLayers: Map<string, IInfoLayer>;
}

export class Group extends BaseLayer<IGroupProps, IGroupState, OlGroupLayer, null> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  public constructor(props: IGroupProps) {
    super(props);
    this.state = { readyGroup: false };
  }

  public componentDidMount() {
    mountInfoLayers(this.context.setInfoLayer, this.props.children, this.props.id);
    super.componentDidMount();
  }

  public componentDidUpdate(prevProps: IGroupProps) {
    updateInfoLayers(this.context.setInfoLayer, prevProps.children, this.props.children, null, null);
    super.componentDidUpdate(prevProps);
  }

  public createOlLayer(): OlGroupLayer {
    this.setState({ readyGroup: true });
    return new OlGroupLayer();
  }

  public renderLayers(): React.ReactElement<IBaseLayerProps>[] {
    const elems: React.ReactElement<IBaseLayerProps>[] = [];
    this.context.getInfoLayers(this.props.id).forEach((infoLayer: IInfoLayer) => {
      if (
        infoLayer.status === 'orig_add' ||
        infoLayer.status === 'ext_add' ||
        infoLayer.status === 'orig_modif_by_ext'
      ) {
        elems.push(React.cloneElement(infoLayer.reactBaseLayerElement, { key: infoLayer.id }));
      }
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
            olMap: this.context.olMap,
            olGroup: this.getOlLayer()
          }}
        >
          {this.renderLayers()}
        </mapContext.Provider>
      </div>
    );
  }
}
