import * as React from 'react';
import { IBaseButtonToolProps, BaseButtonTool } from '../tool';

export class CounterButton extends BaseButtonTool<IBaseButtonToolProps, any> {
  public constructor(props: IBaseButtonToolProps) {
    super(props);
    if (props.activated) {
      this.state = { count: 1 };
    } else {
      this.state = { count: 0 };
    }
  }

  public componentDidUpdate(prevProps: IBaseButtonToolProps, prevState: any, snap: any) {
    if (this.props.activated && !prevProps.activated) {
      this.setState({
        count: this.state.count + 1
      });
    }
  }

  public renderTool(): any {
    return <span>count: {String(this.state.count)}</span>;
  }
}
