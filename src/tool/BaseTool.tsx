import * as React from 'react';
import { IRomapContext, romapContext } from '../RomapContext';

export interface IBaseToolProps {
  /**
   * Unique id is mandatory.
   */
  uid: React.Key;
  /**
   * Activated.
   */
  activated?: boolean;
  /**
   * Activated by default when all others are deactivated.
   */
  defaultActivated?: boolean;
  /**
   * Independant.
   */
  independant?: boolean;
  /**
   * Disabled.
   */
  disabled?: boolean;
  /**
   * Class name.
   */
  className?: string;
}

export class BaseTool<P extends IBaseToolProps, S> extends React.Component<P, S> {
  public static defaultProps = {
    activated: false,
    defaultActivated: false,
    independant: false,
    className: 'tool'
  };

  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  public componentDidMount() {
    this.toolDidConstruct();
    if (this.props.activated == true) {
      this.toolDidActivate();
    } else {
      this.toolDidDeactivate();
    }
  }

  public componentDidUpdate(prevProps: P, prevState: S, snap: any) {
    if (this.props.activated == true && prevProps.activated != true) {
      this.toolDidActivate();
    }
    if (this.props.activated != true && prevProps.activated == true) {
      this.toolDidDeactivate();
    }
  }

  public toolDidConstruct(): void {}

  public toolDidActivate(): void {}

  public toolDidDeactivate(): void {}

  /**
   * Activate tool.
   */
  public activate() {
    if (!this.props.independant) {
      this.context.toolsManager.activateTool(this.props.uid);
    }
  }

  /**
   * Deactivate tool
   */
  public deactivate() {
    if (!this.props.independant) {
      this.context.toolsManager.deactivateTool(this.props.uid);
    }
  }

  public handleBaseToolClick = () => {
    this.activate();
  };

  public renderTool(): React.ReactNode {
    return null;
  }

  public render(): React.ReactNode {
    const className = `${this.props.className}
      ${this.props.activated ? `${this.props.className}-activated` : `${this.props.className}-unactivated`}
      ${this.props.disabled ? `${this.props.className}-disabled` : `${this.props.className}-enabled`}`;
    return (
      <div onClick={this.handleBaseToolClick} className={className}>
        {this.renderTool()}
      </div>
    );
  }
}
