import * as React from 'react';
import OlOverlay from 'ol/Overlay';
import { romapContext, IRomapContext } from '../RomapContext';
import { BaseContainer, IBaseContainerProps, IBaseContaineState } from './BaseContainer';

export interface IOverlayProps extends IBaseContainerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Positioning.
   */
  positioning?: string;
  /**
   * Position.
   */
  position?: [number, number];
  /**
   * Autopan.
   */
  stopEvent?: boolean;
  /**
   * Autopan.
   */
  autoPan?: boolean;
}

export interface IOverlayState extends IBaseContaineState {
  /**
   * Overlay.
   */
  overlay: OlOverlay;
}

export class Overlay extends BaseContainer<IOverlayProps, IOverlayState> {
  public static contextType: React.Context<IRomapContext> = romapContext;

  public static defaultProps = {
    positioning: 'top-left',
    stopEvent: false,
    autoPan: false
  };

  public context: IRomapContext;

  /**
   * Overlay div.
   */
  private overlayDiv: any;

  /**
   * Old position X.
   */
  private oldPositionX: number;

  /**
   * Old position Y.
   */
  private oldPositionY: number;

  constructor(props: IOverlayProps) {
    super(props);
    this.state = {
      changedCounter: 0,
      overlay: null
    };
  }

  public componentDidMount() {
    this.createOverlay();
  }

  public componentDidUpdate(prevProps: IOverlayProps, prevState: IOverlayState, snap: any) {
    super.componentDidUpdate(prevProps, prevState, snap);
    this.state.overlay.setPositioning(this.props.positioning as any);
    this.computePosition();
  }

  public componentWillUnmount() {
    this.context.olMap.removeOverlay(this.state.overlay);
  }

  public createOverlay() {
    const overlay = new OlOverlay({
      element: this.overlayDiv.children[0],
      stopEvent: this.props.stopEvent,
      autoPan: this.props.autoPan
    });
    this.context.olMap.addOverlay(overlay);
    this.setState({
      overlay
    });
  }

  public computePosition() {
    if (!this.props.position) {
      this.state.overlay.setPosition(null);
      this.oldPositionX = NaN;
      this.oldPositionY = NaN;
      return;
    }
    if (this.props.position[0] === this.oldPositionX && this.props.position[1] === this.oldPositionY) {
      return;
    }
    if (!this.props.autoPan) {
      this.state.overlay.setPosition(this.props.position);
      return;
    } else {
      if (this.props.position) {
        this.state.overlay.setPosition([this.props.position[0], this.props.position[1] - 1]);
      } else {
        this.state.overlay.setPosition(null);
      }
      setTimeout(() => {
        if (this.props.position) {
          this.state.overlay.setPosition(this.props.position);
        }
      }, 800);
    }
    this.oldPositionX = this.props.position[0];
    this.oldPositionY = this.props.position[1];
  }

  public render(): React.ReactNode {
    return (
      <div style={{ display: 'none' }}>
        <div
          ref={(overlayDiv: any) => {
            this.overlayDiv = overlayDiv;
          }}
        >
          <div>{this.renderChildren()}</div>
        </div>
      </div>
    );
  }
}
