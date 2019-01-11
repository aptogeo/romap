import * as React from 'react';
import OlGroupLayer from 'ol/layer/Group';
import { BaseLayer, IBaseLayerProps } from './BaseLayer';
import { mapContext, IMapContext, IInfoLayer } from '../RomapContext';
import { mountInfoLayers, updateInfoLayers, setInfoLayerInMap } from '../utils';

export interface IGroupProps extends IBaseLayerProps {
  /**
   * Content.
   */
  children?: React.ReactNode;
}

export interface IGroupState {
  /**
   * Group is ready ?.
   */
  readyGroup: boolean;
  /**
   * Info layers.
   */
  infoLayers: Map<string, IInfoLayer>;
}

export class Group extends BaseLayer<IGroupProps, IGroupState, OlGroupLayer, null> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  public constructor(props: IGroupProps) {
    super(props);
    this.state = { readyGroup: false, infoLayers: new Map<string, IInfoLayer>() };
  }

  public componentDidMount() {
    const infoLayers = new Map<string, IInfoLayer>();
    mountInfoLayers(infoLayers, this.props.children);
    this.setState({ infoLayers });
    super.componentDidMount();
  }

  public componentDidUpdate(prevProps: IGroupProps) {
    const infoLayers = new Map<string, IInfoLayer>(this.state.infoLayers);
    const changed = updateInfoLayers(infoLayers, this.props.children);
    if (changed) {
      this.setState({ infoLayers });
    }
    super.componentDidUpdate(prevProps);
  }

  public createOlLayer(): OlGroupLayer {
    this.setState({ readyGroup: true });
    return new OlGroupLayer();
  }

  public setInfoLayer = (infoLayer: IInfoLayer) => {
    const infoLayers = new Map<string, IInfoLayer>(this.state.infoLayers);
    const changed = setInfoLayerInMap(infoLayers, infoLayer);
    if (changed) {
      this.setState({ infoLayers });
    }
  };

  public render(): React.ReactNode {
    if (!this.state.readyGroup) {
      return null;
    }
    return (
      <div>
        <mapContext.Provider
          value={{
            olMap: this.context.olMap,
            olGroup: this.getOlLayer(),
            infoLayers: this.context.infoLayers,
            setInfoLayer: this.setInfoLayer
          }}
        >
          {this.props.children}
        </mapContext.Provider>
      </div>
    );
  }
}
