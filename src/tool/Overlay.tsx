import * as React from 'react';
import OlOverlay from 'ol/Overlay';
import { mapContext } from '../MapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

export interface IOverlayProps extends IBaseToolProps {
  /**
   * Content.
   */
  children?: React.ReactNode;
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
  autoPan?: boolean;
}

export interface IOverlayState {
  /**
   * Overlay.
   */
  overlay: OlOverlay;
}

export class Overlay extends BaseTool<IOverlayProps, IOverlayState> {
  public static defaultProps = {
    positioning: 'top-left',
    autoPan: false
  };

  public static contextType = mapContext;

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
      overlay: null
    };
  }

  public componentDidMount() {
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    if (this.overlayDiv != null && this.state.overlay == null) {
      this.createOverlay();
    }
    if (this.state.overlay == null) {
      return;
    }
    this.state.overlay.setPositioning(this.props.positioning as any);
    this.computePosition();
  }

  public componentWillUnmount() {
    this.context.olMap.removeOverlay(this.state.overlay);
  }

  public createOverlay() {
    const overlay = new OlOverlay({
      element: this.overlayDiv.children[0],
      stopEvent: false,
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
    let children: React.ReactNodeArray = [];
    if (this.state.overlay != null) {
      children = this.getChildren();
    }
    return (
      <div style={{ display: 'none' }}>
        <div
          ref={(overlayDiv: any) => {
            this.overlayDiv = overlayDiv;
          }}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  }
}
