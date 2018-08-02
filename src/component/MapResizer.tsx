import * as React from 'react';
import OlMap from 'ol/Map';

export class MapResizer extends React.Component<{}, {}> {
  public static contextTypes = {
    /**
     * OpenLayers map.
     */
    olMap: OlMap
  };

  public componentWillMount() {
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  public updateSize() {
    const olMap = this.context.olMap;
    const targetElement = olMap.getTargetElement();
    if (targetElement) {
      const w = targetElement.parentElement.offsetWidth;
      const h = targetElement.parentElement.offsetHeight;
      targetElement.style.width = `${w}px`;
      targetElement.style.height = `${h}px`;
      olMap.setSize([w, h]);
    }
  }

  public render(): any {
    return null;
  }
}
