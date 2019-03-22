import * as React from 'react';
import OlControl from 'ol/control/Control';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseContainer, IBaseContainerProps } from './BaseContainer';

export interface IControlProps extends IBaseContainerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
}

export interface IControlState {
  /**
   * Control.
   */
  control: OlControl;
}

export class Control extends BaseContainer<IControlProps, IControlState> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  /**
   * Control div.
   */
  private controlDiv: any;

  constructor(props: IControlProps) {
    super(props);
    this.state = {
      control: null
    };
  }

  public componentDidMount() {
    super.componentDidMount();
    this.createControl();
  }

  public componentWillUnmount() {
    this.context.olMap.removeControl(this.state.control);
  }

  public createControl() {
    const control = new OlControl({
      element: this.controlDiv.children[0],
      target: this.context.olMap.getOverlayContainer()
    });
    this.context.olMap.addControl(control);
    this.setState({
      control
    });
  }

  public render(): React.ReactNode {
    return (
      <div style={{ display: 'none' }}>
        <div
          ref={(controlDiv: any) => {
            this.controlDiv = controlDiv;
          }}
        >
          <div>{this.renderChildren()}</div>
        </div>
      </div>
    );
  }
}