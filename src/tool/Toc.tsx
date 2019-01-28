import * as React from 'react';
import styled from 'styled-components';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

const Container = styled.div`
  top: 15px;
  right: 15px;
  width: 200px;
  background-color: white;
`;

const SpanParentSubTree = styled.span`
  ::after {
    margin-left: 10px;
    margin-botom: 2px;
    content: '▶';
  }
`;

const DivSubTree = styled.div`
  margin-left: 20px;
`;

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

  public handleCheckboxChange = (e: React.ChangeEvent) => {
    const id = e.currentTarget.getAttribute('data-id');
    const infoLayer = this.context.getInfoLayer(id);
    if (infoLayer) {
      const visible = !infoLayer.reactBaseLayerElement.props.visible;
      this.context.setInfoLayer({
        ...infoLayer,
        reactBaseLayerElement: React.cloneElement(infoLayer.reactBaseLayerElement, { visible })
      });
    }
  };

  public renderBaseList(parentId: string = null): React.ReactNodeArray {
    const bases: React.ReactNodeArray = [];
    const infoLayers = this.context.getInfoLayers(parentId);
    if (infoLayers == null) {
      return null;
    }
    infoLayers.forEach(infoLayer => {
      if (infoLayer.reactBaseLayerElement.props.type === 'BASE') {
        bases.push(
          <div key={infoLayer.id}>
            <input type="radio" name="radiotoc" checked={infoLayer.reactBaseLayerElement.props.visible} />
            <label>{infoLayer.reactBaseLayerElement.props.name}</label>
          </div>
        );
        const subBaseList = this.renderBaseList(infoLayer.id);
        if (subBaseList) {
          bases.push(subBaseList);
        }
      }
    });
    return bases;
  }

  public renderOverlayTree(parentId: string = null): React.ReactNodeArray {
    const overlayTree: React.ReactNodeArray = [];
    const infoLayers = this.context.getInfoLayers(parentId);
    if (infoLayers == null || infoLayers.length === 0) {
      return null;
    }
    infoLayers.forEach(infoLayer => {
      if (infoLayer.reactBaseLayerElement.props.type === 'OVERLAY') {
        const subOverlayTree = this.renderOverlayTree(infoLayer.id);
        if (subOverlayTree == null) {
          overlayTree.push(
            <div key={infoLayer.id}>
              <input
                type="checkbox"
                checked={infoLayer.reactBaseLayerElement.props.visible}
                onChange={this.handleCheckboxChange}
                data-id={infoLayer.id}
              />
              <label>{infoLayer.reactBaseLayerElement.props.name}</label>
            </div>
          );
        } else {
          overlayTree.push(
            <div key={infoLayer.id}>
              <SpanParentSubTree>
                <input
                  type="checkbox"
                  checked={infoLayer.reactBaseLayerElement.props.visible}
                  onChange={this.handleCheckboxChange}
                  data-id={infoLayer.id}
                />
                <label>{infoLayer.reactBaseLayerElement.props.name}</label>
              </SpanParentSubTree>
              <DivSubTree>{subOverlayTree}</DivSubTree>
            </div>
          );
        }
      }
    });
    return overlayTree;
  }

  public render(): React.ReactNode {
    if (this.props.disable === true) {
      return null;
    }
    return (
      <Container className={`${this.props.className} ol-unselectable ol-control`}>
        {this.renderBaseList()}
        {this.renderOverlayTree()}
      </Container>
    );
  }
}
