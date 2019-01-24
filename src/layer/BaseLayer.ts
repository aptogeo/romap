import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
import OlSource from 'ol/source/Source';
import { walk } from '../utils';
import { MapChild } from '../RomapChild';
import { mapContext, IMapContext } from '../RomapContext';
import { jsonEqual } from '../utils';

let globalOrder = 0;

export interface IBaseLayerProps {
  /**
   * Unique id.
   */
  id: string;
  /**
   * Name.
   */
  name?: string;
  /**
   * type: BASE or OVERLAY.
   */
  type?: 'BASE' | 'OVERLAY';
  /**
   * Extent.
   */
  extent?: [number, number, number, number];
  /**
   * Order position.
   */
  order?: number;
  /**
   * Visible.
   */
  visible?: boolean;
  /**
   * Opacity.
   */
  opacity?: number;
}

export class BaseLayer<P extends IBaseLayerProps, S, OLL extends OlBaseLayer, OLS extends OlSource> extends MapChild<
  P,
  S
> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public static defaultProps = {
    type: 'OVERLAY'
  };

  public context: IMapContext;

  private olLayer: OLL = null;

  public componentDidMount() {
    this.olLayer = this.createOlLayer();
    this.updateProps({} as P, this.props);
    // Add OlLayer to map
    if (this.props.type === 'BASE') {
      this.context.olMap.addLayer(this.olLayer);
    } else {
      this.context.olGroup.getLayers().push(this.olLayer);
    }
    // Activate events
    this.internalAddEvents();
  }

  public componentDidUpdate(prevProps: P) {
    this.updateProps(prevProps, this.props);
  }

  public componentWillUnmount() {
    // Remove events
    this.internalRemoveEvents();
    // Remove OlLayer to map
    walk(this.context.olMap, (currentOlLayer, idx, parent) => {
      if (currentOlLayer === this.olLayer) {
        parent.getLayers().remove(this.olLayer);
      }
      return true;
    });
    this.context.olMap.removeLayer(this.olLayer);
  }

  public createOlLayer(): OLL {
    return null;
  }

  public updateProps(prevProps: P, nextProps: P) {
    this.setContext(this.context);
    if (prevProps.id !== nextProps.id) {
      this.setId(nextProps.id);
    }
    if (prevProps.name !== nextProps.name) {
      this.setName(nextProps.name);
    }
    if (prevProps.type !== nextProps.type) {
      this.setType(nextProps.type);
    }
    if (prevProps.visible !== nextProps.visible) {
      this.setVisible(nextProps.visible);
    }
    if (prevProps.opacity !== nextProps.opacity) {
      this.setOpacity(nextProps.opacity);
    }
    if (!jsonEqual(prevProps.extent, nextProps.extent)) {
      this.setExtent(nextProps.extent);
    }
    if (prevProps.order !== nextProps.order || prevProps.type !== nextProps.type) {
      this.setOrder(nextProps.order, nextProps.type);
    }
    this.setReactProps(nextProps);
  }

  public internalRemoveEvents() {
    // Unwatch events on layer
    this.olLayer.un('propertychange', this.handleBaseLayerPropertychange);
  }

  public internalAddEvents() {
    // Watch events on layer
    this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
  }

  public getOlLayer(): OLL {
    return this.olLayer;
  }

  public getOlSource(): OLS {
    if ('getSource' in this.olLayer) {
      return (this.olLayer as any).getSource();
    }
    return null;
  }

  public setOlSource(olSource: any): any {
    if ('setSource' in this.olLayer) {
      return (this.olLayer as any).setSource(olSource);
    }
  }

  public setContext(mapContext: IMapContext) {
    this.olLayer.set('mapContext', mapContext);
  }

  public setId(id: string) {
    this.olLayer.set('id', id);
  }

  public setName(name: string) {
    this.olLayer.set('name', name);
  }

  public setType(type: string) {
    if (type == null || (type !== 'BASE' && type !== 'OVERLAY')) {
      type = 'OVERLAY';
    }
    this.olLayer.set('type', type);
  }

  public setOrder(order: number, type: string) {
    order = +order;
    if (order == null || order < 0) {
      order = globalOrder + 1;
    }
    if (order > globalOrder) {
      globalOrder = order;
    }
    let zIndex = order;
    if (type === 'OVERLAY') {
      zIndex += 10000;
    }
    this.olLayer.set('order', order);
    this.olLayer.setZIndex(zIndex);
  }

  public setOpacity(opacity: number) {
    if (opacity !== +opacity) {
      opacity = 1;
    }
    if (opacity < 0 && opacity > 1) {
      opacity = 1;
    }
    this.olLayer.setOpacity(opacity);
  }

  public setVisible(visible: boolean) {
    if (visible !== false) {
      visible = true;
    }
    this.olLayer.setVisible(visible);
  }

  public setExtent(extent: [number, number, number, number]) {
    if (extent == null) {
      extent = undefined;
    }
    this.olLayer.setExtent(extent);
  }

  public setReactProps(props: P) {
    this.olLayer.set('reactProps', props, false);
  }

  private handleBaseLayerPropertychange = (event: any) => {
    const key = event.key;
    const value = event.target.get(key);
    if (key === 'visible' && value === true && this.props.type === 'BASE') {
      walk(this.context.olMap, (currentOlLayer: any) => {
        if (currentOlLayer.get('type') === 'BASE' && currentOlLayer !== this.olLayer) {
          const mapContext = currentOlLayer.get('mapContext') as IMapContext;
          const infoLayer = mapContext.getInfoLayer(currentOlLayer.get('id'));
          if (infoLayer.reactBaseLayerProps.visible) {
            infoLayer.reactBaseLayerProps.visible = false;
            mapContext.setInfoLayer(infoLayer);
          }
        }
        return true;
      });
    }
  };

  public render(): React.ReactNode {
    return null;
  }
}
