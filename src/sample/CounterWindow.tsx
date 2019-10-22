import * as React from 'react';
import { IBaseWindowToolProps, BaseWindowTool } from '../tool';

export class CounterWindow extends BaseWindowTool<IBaseWindowToolProps, any> {
  public constructor(props: IBaseWindowToolProps) {
    super(props);
    if (props.activated) {
      this.state = { count: 1 };
    } else {
      this.state = { count: 0 };
    }
  }

  public componentDidUpdate(prevProps: IBaseWindowToolProps, prevState: any, snapshot: any) {
    if (this.props.activated && !prevProps.activated) {
      this.setState({
        count: this.state.count + 1
      });
    }
  }

  public renderHeaderContent(): React.ReactNode {
    return <span>Counter</span>;
  }

  public renderOpenButtonContent(): React.ReactNode {
    return <span>Counter</span>;
  }

  public renderTool(): any {
    return <span>count: {String(this.state.count)}</span>;
  }
}
