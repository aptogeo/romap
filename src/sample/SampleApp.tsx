import * as React from 'react';
import * as Romap from '../';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';

import './sample.css';
import './panzoom.css';
import './scaleline.css';

const landsatSource = new ImageArcGISRest({
  url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer',
  projection: 'EPSG:3857',
  params: {
    FORMAT: 'jpgpng',
    TRANSPARENT: true
  },
  ratio: 1
});

export class SampleApp extends React.Component {
  public render(): any {
    return (
      <div className="container">
        <Romap.Map keyboardEventTarget={document}>
          <Romap.component.PanZoom />
          <Romap.component.ScaleLine />
          <Romap.View center={[508885, 5055970]} zoom={4} />
          <Romap.layer.Image source={landsatSource} />
        </Romap.Map>
      </div>
    );
  }
}
