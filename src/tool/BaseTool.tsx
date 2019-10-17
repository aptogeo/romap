import * as React from 'react';
import { RomapChild, IRomapChildProps } from '../RomapChild';
import { IRomapContext, romapContext } from '../RomapContext';

export interface IBaseToolProps extends IRomapChildProps {
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

export class BaseTool<P extends IBaseToolProps, S> extends RomapChild<P, S> {
  public static defaultProps = {
    activated: false,
    defaultActivated: false,
    independant: false,
    className: 'tool'
  };

  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  /**
   * Activate tool.
   */
  public activate() {
    if (!this.props.independant) {
      this.context.romapManager.activateTool(this.props.id);
    }
  }

  /**
   * Deactivate tool
   */
  public deactivate() {
    if (!this.props.independant) {
      this.context.romapManager.deactivateTool(this.props.id);
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
