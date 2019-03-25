import * as React from 'react';
import * as romap from '../';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { generateUUID } from '../utils';

export class SampleApp extends React.Component {
  public render(): React.ReactNode {
    const wkt2154 =
      'PROJCS["RGF93 / Lambert-93",GEOGCS["RGF93",DATUM["Reseau_Geodesique_Francais_1993",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6171"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4171"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",49],PARAMETER["standard_parallel_2",44],PARAMETER["latitude_of_origin",46.5],PARAMETER["central_meridian",3],PARAMETER["false_easting",700000],PARAMETER["false_northing",6600000],AUTHORITY["EPSG","2154"],AXIS["X",EAST],AXIS["Y",NORTH]]';
    const wkt27700 =
      'PROJCS["OSGB 1936 / British National Grid",GEOGCS["OSGB 1936",DATUM["OSGB_1936",SPHEROID["Airy 1830",6377563.396,299.3249646,AUTHORITY["EPSG","7001"]],AUTHORITY["EPSG","6277"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4277"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",49],PARAMETER["central_meridian",-2],PARAMETER["scale_factor",0.9996012717],PARAMETER["false_easting",400000],PARAMETER["false_northing",-100000],AUTHORITY["EPSG","27700"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';

    const world2D = new romap.source.TileArcGISRest({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer',
      projection: 'EPSG:3857'
    });

    const britishNationalGrid = new romap.source.ImageStatic({
      url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/British_National_Grid.svg/2000px-British_National_Grid.svg.png',
      projection: 'EPSG:27700',
      imageExtent: [0, 0, 700000, 1300000]
    });

    const landsatSource = new romap.source.ImageArcGISRest({
      url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer',
      projection: 'EPSG:3857',
      params: {
        FORMAT: 'jpgpng',
        TRANSPARENT: true
      },
      ratio: 1
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <romap.Romap
          keyboardEventTarget={document}
          initialViewCenter={[490000, 6800000]}
          initialViewZoom={5}
          initialViewProjection="EPSG:2154"
          style={{ flex: '1 1 0' }}
          olMapStyle={{ height: 600 }}
        >
          <romap.Projection code="EPSG:2154" name="RGF93 / Lambert-93" wkt={wkt2154} />
          <romap.Projection code="EPSG:27700" name="OSGB 1936 / British National Grid " wkt={wkt27700} />
          <romap.layer.Tile source={world2D} name="World 2D" type="BASE" visible={true} id={generateUUID()} />
          <romap.layer.Image source={landsatSource} name="Land sat" type="BASE" id={generateUUID()} />
          <romap.layer.Group name="Groupe 1" id={generateUUID()}>
            <romap.layer.Image source={britishNationalGrid} name="British National Grid" id={generateUUID()} />
          </romap.layer.Group>
          <romap.container.Control id={generateUUID()}>
            <romap.tool.PanZoom id={generateUUID()} />
          </romap.container.Control>
          <romap.container.Control id={generateUUID()}>
            <romap.tool.ScaleLine id={generateUUID()} />
          </romap.container.Control>
          <romap.container.Control id={generateUUID()}>
            <romap.tool.Toc id={generateUUID()} />
          </romap.container.Control>
        </romap.Romap>
      </div>
    );
  }
}
