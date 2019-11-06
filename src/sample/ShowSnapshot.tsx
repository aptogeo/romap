import * as React from 'react';
import styled from 'styled-components';
import { IBaseWindowToolProps, BaseWindowTool } from '../tool';
import { IRomapContext, romapContext } from '../RomapContext';

const Container = styled.div`
  margin: 2px;
  display: flex;
  flex-direction: column;
`;

export class ShowSnapshot extends BaseWindowTool<IBaseWindowToolProps, any> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  constructor(props: IBaseWindowToolProps) {
    super(props);
    this.state = { snapshot: '' };
  }

  public componentDidMount() {
    const snapshot = JSON.stringify(this.context.layersManager.getSnapshot());
    this.setState({ snapshot });
  }

  public handleGetButtonClick = (event: any) => {
    event.preventDefault();
    const snapshot = JSON.stringify(this.context.layersManager.getSnapshot());
    this.setState({ snapshot });
  };

  public handleReloadButtonClick = (event: any) => {
    event.preventDefault();
    const snapshot = JSON.parse(this.state.snapshot);
    this.context.layersManager.reloadFromSnapshot(snapshot);
  };

  public handleClearButtonClick = (event: any) => {
    event.preventDefault();
    const clearSnapshot = { ...JSON.parse(this.state.snapshot), layers: [] };
    this.context.layersManager.reloadFromSnapshot(clearSnapshot);
  };

  public handleTextareaChange = (event: any) => {
    this.setState({ snapshot: event.target.value });
  };

  public renderHeaderContent(): React.ReactNode {
    return <span>Show snapshot</span>;
  }

  public renderOpenButtonContent(): React.ReactNode {
    return <span>Show snapshot</span>;
  }

  public renderTool(): React.ReactNode {
    return (
      <Container>
        <textarea value={this.state.snapshot} onChange={this.handleTextareaChange} />
        <button onClick={this.handleGetButtonClick}>Get snapshot from map</button>
        <button onClick={this.handleReloadButtonClick}>Reload map from snapshot</button>
        <button onClick={this.handleClearButtonClick}>Clear map</button>
      </Container>
    );
  }
}
