import * as React from 'react';
import OlControl from 'ol/control/Control';
import { romapContext, IRomapContext } from '../RomapContext';
import { BaseContainer, IBaseContainerProps, IBaseContaineState } from './BaseContainer';

export interface IControlProps extends IBaseContainerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
}

export interface IControlState extends IBaseContaineState {
  /**
   * Control.
   */
  control: OlControl;
}

export class Control extends BaseContainer<IControlProps, IControlState> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public context: IRomapContext;

  /**
   * Control div.
   */
  private controlDiv: any;

  constructor(props: IControlProps) {
    super(props);
    this.state = {
      changedCounter: 0,
      control: null
    };
  }

  public componentDidMount() {
    this.createControl();
  }

  public componentWillUnmount() {
    this.context.olMap.removeControl(this.state.control);
  }

  public createControl() {
    const control = new OlControl({
      element: this.controlDiv.children[0],
      target: this.context.olMap.getOverlayContainerStopEvent()
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
