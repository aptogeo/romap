import * as React from 'react';
import * as romap from '../';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import ImageStatic from 'ol/source/ImageStatic';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

import './sample.css';
import './panzoom.css';
import './scaleline.css';

export class SampleApp extends React.Component {
  public render(): any {
    const wkt2154 =
      'PROJCS["RGF93 / Lambert-93",GEOGCS["RGF93",DATUM["Reseau_Geodesique_Francais_1993",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6171"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4171"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",49],PARAMETER["standard_parallel_2",44],PARAMETER["latitude_of_origin",46.5],PARAMETER["central_meridian",3],PARAMETER["false_easting",700000],PARAMETER["false_northing",6600000],AUTHORITY["EPSG","2154"],AXIS["X",EAST],AXIS["Y",NORTH]]';
    const wkt27700 =
      'PROJCS["OSGB 1936 / British National Grid",GEOGCS["OSGB 1936",DATUM["OSGB_1936",SPHEROID["Airy 1830",6377563.396,299.3249646,AUTHORITY["EPSG","7001"]],AUTHORITY["EPSG","6277"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4277"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",49],PARAMETER["central_meridian",-2],PARAMETER["scale_factor",0.9996012717],PARAMETER["false_easting",400000],PARAMETER["false_northing",-100000],AUTHORITY["EPSG","27700"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';

    return (
      <div>
        <romap.Projection code="EPSG:2154" name="RGF93 / Lambert-93" wkt={wkt2154} />
        <romap.Projection code="EPSG:27700" name="OSGB 1936 / British National Grid " wkt={wkt27700} />
        <Maps />
      </div>
    );
  }
}

class Maps extends React.Component {
  public render(): any {
    const world2D = new TileArcGISRest({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer',
      projection: 'EPSG:3857'
    });

    const britishNationalGrid = new ImageStatic({
      url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/British_National_Grid.svg/2000px-British_National_Grid.svg.png',
      projection: 'EPSG:27700',
      imageExtent: [0, 0, 700000, 1300000]
    });

    const landsatSource = new ImageArcGISRest({
      url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer',
      projection: 'EPSG:3857',
      params: {
        FORMAT: 'jpgpng',
        TRANSPARENT: true
      },
      ratio: 1
    });

    const statesProvincesLinesSource = new romap.source.Wfs({
      url: 'https://ahocevar.com/geoserver/wfs',
      typename: 'ne:ne_10m_admin_1_states_provinces_lines_shp'
    });

    return (
      <div className="maps">
        <romap.Map keyboardEventTarget={document}>
          <romap.View center={[490000, 6800000]} zoom={5} projection="EPSG:2154" />
          <romap.layer.Tile source={world2D} data={{ name: 'World 2D' }} />
          <romap.layer.Image source={britishNationalGrid} data={{ name: 'British National Grid' }} />
          <romap.component.Control>
            <romap.component.PanZoom />
          </romap.component.Control>
          <romap.component.Control>
            <romap.component.ScaleLine />
          </romap.component.Control>
        </romap.Map>
        <romap.Map keyboardEventTarget={document}>
          <romap.View center={[508000, 6000000]} zoom={5} />
          <romap.layer.Vector
            source={statesProvincesLinesSource}
            style={
              new Style({
                stroke: new Stroke({
                  color: 'rgba(0, 0, 255, 1.0)',
                  width: 2
                })
              })
            }
            name="States Provinces Lines"
          />
          <romap.component.Control>
            <romap.component.PanZoom showZoomSlider={false} showOrigin={false} />
          </romap.component.Control>
          <romap.component.Control>
            <romap.component.ScaleLine />
          </romap.component.Control>
        </romap.Map>
      </div>
    );
  }
}
