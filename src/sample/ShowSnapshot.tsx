import * as React from 'react';
import { IBaseWindowToolProps, BaseWindowTool } from '../tool';
import { IRomapContext, romapContext } from '../RomapContext';

export class ShowSnapshot extends BaseWindowTool<IBaseWindowToolProps, any> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  public constructor(props: IBaseWindowToolProps) {
    super(props);
    this.state = { snapshot: '' };
  }

  public handleRefeshButtonClick = (event: any) => {
    event.preventDefault();
    const snapshot = this.context.layersManager.getSnapshot();
    this.setState({ snapshot });
  };

  public renderHeaderContent(): React.ReactNode {
    return <span>Show snapshot</span>;
  }

  public renderOpenButtonContent(): React.ReactNode {
    return <span>Show snapshot</span>;
  }

  public renderTool(): React.ReactNode {
    return (
      <div>
        <p dangerouslySetInnerHTML={{ __html: JSON.stringify(this.state.snapshot).replace(/\\n/g, '') }} />
        <button onClick={this.handleRefeshButtonClick}>Refresh</button>
      </div>
    );
  }
}
