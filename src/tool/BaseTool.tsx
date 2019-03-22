import * as React from 'react';
import { RomapChild, IRomapChildProps } from '../RomapChild';
import { IMapContext, mapContext } from '../RomapContext';

export interface IBaseToolProps extends IRomapChildProps {
  /**
   * Unique id.
   */
  id: string;
  /**
   * Active.
   */
  activated?: boolean;
  /**
   * Active by default when all others are deactivated.
   */
  defaultActivated?: boolean;
  /**
   * Independant.
   */
  independant?: boolean;
  /**
   * Disable.
   */
  disable?: boolean;
}

export class BaseTool<P extends IBaseToolProps, S> extends RomapChild<P, S> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

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

  public handleClick = () => {
    this.activate();
  }

  public renderTool(): React.ReactNode {
    return null;
  }

  public render(): React.ReactNode {
    const className = (this.props.activated) ? 'activated': 'deactivated';
    return (
      <div onClick={this.handleClick.bind(this)} className={className}>
        {this.renderTool()}
      </div>
    );
  }
}
