import * as React from 'react';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseContainer, IBaseContainerProps } from './BaseContainer';

export interface IZoneProps extends IBaseContainerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Class name.
   */
  className?: string;
  /**
   * Style.
   */
  style?: React.CSSProperties;
}

export class Zone extends BaseContainer<IZoneProps, {}> {
  public static defaultProps = {
    className: 'zone'
  };

  public render(): React.ReactNode {
    const className = `${this.props.className}`;
    return (
      <div className={className} style={this.props.style}>{this.renderChildren()}</div>
    );
  }
}
