import * as React from 'react';
import { mapContext, IMapContext } from './RomapContext';

export interface IResizerProps {
  /**
   * Height removal.
   */
  heightRemoval?: string;
}

export class HeightResizer extends React.Component<IResizerProps, {}> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public static defaultProps = {
    heightRemoval: '15px'
  };

  public context: IMapContext;

  public componentDidMount() {
    window.addEventListener('resize', this.updateSize);
    setTimeout(() => {
      this.updateSize();
    }, 1000);
  }

  public componentDidUpdate() {
    this.updateSize();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  public updateSize = () => {
    const olMap = this.context.olMap;
    const targetElement = olMap.getTargetElement() as HTMLElement;
    if (targetElement) {
      targetElement.parentElement.style.height = `calc(100% - ${this.props.heightRemoval})`;
      const w = targetElement.offsetWidth;
      const h = targetElement.parentElement.offsetHeight;
      targetElement.style.height = `${h}px`;
      olMap.setSize([w, h]);
    }
  };

  public render(): React.ReactNode {
    return null;
  }
}
