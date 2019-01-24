import * as React from 'react';
import { mapContext, IMapContext } from '../RomapContext';
import { BaseTool, IBaseToolProps } from './BaseTool';

export class MapResizer extends BaseTool<IBaseToolProps, {}> {
  public static contextType: React.Context<IMapContext> = mapContext;

  public context: IMapContext;

  constructor(props: {}) {
    super(props);
    if (this.props.disable === true) {
      window.removeEventListener('resize', this.updateSize);
    } else {
      window.addEventListener('resize', this.updateSize);
    }
  }

  public updateSize = () => {
    const olMap = this.context.olMap;
    const targetElement = olMap.getTargetElement() as HTMLElement;
    if (targetElement) {
      const w = targetElement.parentElement.offsetWidth;
      const h = targetElement.parentElement.offsetHeight;
      targetElement.style.width = `${w}px`;
      targetElement.style.height = `${h}px`;
      olMap.setSize([w, h]);
    }
  };

  public render(): React.ReactNode {
    return null;
  }
}
