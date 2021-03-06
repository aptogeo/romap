import * as React from 'react';
import styled from 'styled-components';
import { romapContext, IRomapContext } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';
import { IExtended } from '../source';

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
  public static contextType: React.Context<IRomapContext> = romapContext;

  public static defaultProps = {
    ...BaseTool.defaultProps,
    className: 'toc'
  };

  public context: IRomapContext;

  public handleRadioChange = (key: React.Key) => (e: React.ChangeEvent) => {
    this.context.layersManager.updateLayerProps(key, { visible: true });
  };

  public handleCheckboxChange = (key: React.Key) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.context.layersManager.updateLayerProps(key, { visible: e.currentTarget.checked });
  };

  public renderBaseList(parentId: React.Key = 'map'): React.ReactNodeArray {
    const bases: React.ReactNodeArray = [];
    this.context.layersManager
      .getLayerElements(layerElement => layerElement.reactElement.props.type === 'BASE')
      .forEach(layerElement => {
        const source = layerElement.reactElement.props['source'];
        if (source != null && 'isListable' in source) {
          if ((source as IExtended).isListable()) {
            const name = layerElement.reactElement.props.name || '';
            let truncName = name;
            if (truncName.length > 15) {
              truncName = truncName.substring(0, 14) + '…';
            }
            bases.push(
              <div key={layerElement.uid}>
                <input
                  type="radio"
                  name="radiotoc"
                  checked={layerElement.reactElement.props.visible !== false ? true : false}
                  onChange={this.handleRadioChange(layerElement.uid)}
                />
                <label title={name}>{truncName}</label>
              </div>
            );
          }
        }
      });
    return bases;
  }

  public renderOverlayTree(parentId: React.Key = 'map'): React.ReactNodeArray {
    const overlayTree: React.ReactNodeArray = [];
    this.context.layersManager
      .getLayerElements(layerElement => layerElement.reactElement.props.type === 'OVERLAY')
      .forEach(layerElement => {
        const source = layerElement.reactElement.props['source'];
        if (source != null && 'isListable' in source) {
          if ((source as IExtended).isListable()) {
            const name = layerElement.reactElement.props.name || '';
            let truncName = name;
            if (truncName.length > 15) {
              truncName = truncName.substring(0, 14) + '…';
            }
            const input = (
              <input
                type="checkbox"
                checked={layerElement.reactElement.props.visible !== false ? true : false}
                onChange={this.handleCheckboxChange(layerElement.uid)}
              />
            );
            const label = <label title={name}>{truncName}</label>;
            overlayTree.push(
              <div key={layerElement.uid}>
                {input}
                {label}
              </div>
            );
          }
        }
      });
    return overlayTree;
  }

  public renderTool(): React.ReactNode {
    if (this.props.disabled === true) {
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
