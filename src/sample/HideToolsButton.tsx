import * as React from 'react';
import { IBaseButtonToolProps, BaseButtonTool } from '../tool';

export interface IHideToolsButtonProps extends IBaseButtonToolProps {
  hideTools: boolean;
  setHideTools: (hideTools: boolean) => void;
}

export class HideToolsButton extends BaseButtonTool<IHideToolsButtonProps, any> {
  public static defaultProps = {
    ...BaseButtonTool.defaultProps,
    toggle: true
  };

  public handleButtonClick2 = (event: any) => {
    event.preventDefault();
    this.props.setHideTools(!this.props.hideTools);
  };

  public renderTool(): any {
    return <span onClick={this.handleButtonClick2}>Hide tools</span>;
  }
}
