import * as React from 'react';
import { mapContext, IMapContext, IInfoLayer } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

export interface ITocProps extends IBaseToolProps {
  /**
   * Class name.
   */
  className?: string;
}

export class Toc extends BaseTool<ITocProps, any> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public static defaultProps = {
    className: 'toc'
  };

  public context: IMapContext;

  public renderBaseList(infoLayers: IInfoLayer[]): React.ReactNode {
    const bases: React.ReactNodeArray = [];
    infoLayers.forEach(infoLayer => {
      if (infoLayer.reactBaseLayerProps.type === 'BASE') {
        bases.push(
          <div key={infoLayer.reactBaseLayerProps.id}>
            <input type="radio" name="radiotoc" />
            <label>{infoLayer.reactBaseLayerProps.name}</label>
          </div>
        );
      }
    });
    return bases;
  }

  public renderOverlayTree(infoLayers: IInfoLayer[]): React.ReactNode {
    const overlayTree: React.ReactNodeArray = [];
    infoLayers.forEach(infoLayer => {
      if (infoLayer.reactBaseLayerProps.type === 'OVERLAY') {
        overlayTree.push(
          <div key={infoLayer.reactBaseLayerProps.id}>
            <input type="checkbox" />
            <label>{infoLayer.reactBaseLayerProps.name}</label>
          </div>
        );
      }
    });
    return overlayTree;
  }

  public render(): React.ReactNode {
    if (this.props.disable === true) {
      return null;
    }
    const infoLayers = this.context.getInfoLayers();
    return (
      <div className={`${this.props.className} ol-unselectable ol-control`}>
        {this.renderBaseList(infoLayers)}
        {this.renderOverlayTree(infoLayers)}
      </div>
    );
  }
}
