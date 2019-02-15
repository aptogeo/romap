import * as React from 'react';
import styled from 'styled-components';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

const Container = styled.div`
  top: 15px;
  right: 15px;

  background-color: rgba(213, 213, 213, 0.61);
  border-style: solid;
  border-color: rgba(172, 172, 172, 0.61);
  border-width: 1px;
  border-radius: 5px;
  color: #242424;
  box-shadow: none;
`;

const SubContainer = styled.div`
  width: 200px;
  max-height: 400px;
  margin: 2px;
  overflow-y: auto;
  overflow-x: hidden;
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

export class Toc extends BaseTool<ITocProps, {}> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public static defaultProps = {
    className: 'toc'
  };

  public context: IMapContext;

  public handleRadioChange = (e: React.ChangeEvent) => {
    const id = e.currentTarget.getAttribute('data-id');
    this.context.infoLayerManager.changeInfoLayerProps({ id, visible: true });
  };

  public handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    this.context.infoLayerManager.changeInfoLayerProps({ id, visible: e.currentTarget.checked });
  };

  public renderBaseList(parentId: string = null): React.ReactNodeArray {
    const bases: React.ReactNodeArray = [];
    this.context.infoLayerManager
      .getInfoLayers(
        infoLayer => infoLayer.parentId === parentId && infoLayer.reactBaseLayerElement.props.type === 'BASE'
      )
      .forEach(infoLayer => {
        bases.push(
          <div key={infoLayer.id}>
            <input
              type="radio"
              name="radiotoc"
              checked={infoLayer.reactBaseLayerElement.props.visible ? true : false}
              onChange={this.handleRadioChange}
              data-id={infoLayer.id}
            />
            <label title={infoLayer.reactBaseLayerElement.props.name}>
              {infoLayer.reactBaseLayerElement.props.name}
            </label>
          </div>
        );
        const subBaseList = this.renderBaseList(infoLayer.id);
        if (subBaseList) {
          bases.push(subBaseList);
        }
      });
    return bases;
  }

  public renderOverlayTree(parentId: string = null): React.ReactNodeArray {
    const overlayTree: React.ReactNodeArray = [];
    this.context.infoLayerManager
      .getInfoLayers(
        infoLayer => infoLayer.parentId === parentId && infoLayer.reactBaseLayerElement.props.type === 'OVERLAY'
      )
      .forEach(infoLayer => {
        const name = infoLayer.reactBaseLayerElement.props.name || '';
        let truncName = name;
        if (truncName.length > 15) {
          truncName = truncName.substring(0, 14) + '…';
        }
        const input = (
          <input
            type="checkbox"
            checked={infoLayer.reactBaseLayerElement.props.visible ? true : false}
            onChange={this.handleCheckboxChange}
            data-id={infoLayer.id}
          />
        );
        const label = <label title={name}>{truncName}</label>;
        if (infoLayer.reactBaseLayerElement.props.type === 'OVERLAY') {
          const subOverlayTree = this.renderOverlayTree(infoLayer.id);
          if (subOverlayTree == null || subOverlayTree.length === 0) {
            overlayTree.push(
              <div key={infoLayer.id}>
                {input}
                {label}
              </div>
            );
          } else {
            overlayTree.push(
              <div key={infoLayer.id}>
                <SpanParentSubTree>
                  {input}
                  {label}
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
        <SubContainer>
          {this.renderBaseList()}
          {this.renderOverlayTree()}
        </SubContainer>
      </Container>
    );
  }
}
