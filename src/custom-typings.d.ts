declare module 'ol' {
  export default ol;
}

declare module 'ol/Map' {
  export default ol.Map;
}

declare module 'ol/View' {
  export default ol.View;
}

declare module 'ol/Overlay' {
  export default class extends ol.Overlay {
    constructor(options: any);
  }
}

declare module 'ol/Feature' {
  export default class extends ol.Feature {
    public layerName: string;
    public layerId: number;
    public displayFieldName: string;
  }
}

declare module 'ol/Observable' {
  export default ol.Observable;
  export function unByKey(key: any): void;
}

// LAYERS

declare module 'ol/layer' {
  export default ol.layer;
}

declare module 'ol/layer/Base' {
  export default ol.layer.Base;
}

declare module 'ol/layer/Group' {
  export default ol.layer.Group;
}

declare module 'ol/layer/Heatmap' {
  export default ol.layer.Heatmap;
}

declare module 'ol/layer/Image' {
  export default ol.layer.Image;
}

declare module 'ol/layer/Layer' {
  export default ol.layer.Layer;
}

declare module 'ol/layer/Tile' {
  export default ol.layer.Tile;
}

declare module 'ol/layer/Vector' {
  export default ol.layer.Vector;
}

declare module 'ol/layer/VectorTile' {
  export default ol.layer.VectorTile;
}

// SOURCES

declare module 'ol/source' {
  export default ol.source;
}

declare module 'ol/source/BingMaps' {
  export default ol.source.BingMaps;
}

declare module 'ol/source/CartoDB' {
  export default ol.source.CartoDB;
}

declare module 'ol/source/Cluster' {
  export default ol.source.Cluster;
}

declare module 'ol/source/Image' {
  export default ol.source.Image;
}

declare module 'ol/source/ImageArcGISRest' {
  export default ol.source.ImageArcGISRest;
}

declare module 'ol/source/ImageCanvas' {
  export default ol.source.ImageCanvas;
}

declare module 'ol/source/ImageEvent' {
  export default ol.source.ImageEvent;
}

declare module 'ol/source/ImageMapGuide' {
  export default ol.source.ImageMapGuide;
}

declare module 'ol/source/ImageStatic' {
  export default ol.source.ImageStatic;
}

declare module 'ol/source/ImageVector' {
  export default ol.source.ImageVector;
}

declare module 'ol/source/ImageWMS' {
  export default ol.source.ImageWMS;
}

declare module 'ol/source/OSM' {
  export default ol.source.OSM;
}

declare module 'ol/source/Raster' {
  export default ol.source.Raster;
}

declare module 'ol/source/RasterEvent' {
  export default ol.source.RasterEvent;
}

declare module 'ol/source/Source' {
  export default ol.source.Source;
}

declare module 'ol/source/Stamen' {
  export default ol.source.Stamen;
}

declare module 'ol/source/Tile' {
  export default ol.source.Tile;
}

declare module 'ol/source/TileArcGISRest' {
  export default ol.source.TileArcGISRest;
}

declare module 'ol/source/TileDebug' {
  export default ol.source.TileDebug;
}

declare module 'ol/source/TileEvent' {
  export default ol.source.TileEvent;
}

declare module 'ol/source/TileImage' {
  export default ol.source.TileImage;
}

declare module 'ol/source/TileJSON' {
  export default ol.source.TileJSON;
}

declare module 'ol/source/TileUTFGrid' {
  export default ol.source.TileUTFGrid;
}

declare module 'ol/source/TileWMS' {
  export default ol.source.TileWMS;
}

declare module 'ol/source/UrlTile' {
  export default ol.source.UrlTile;
}

declare module 'ol/source/Vector' {
  export default ol.source.Vector;
}

declare module 'ol/source/VectorEvent' {
  export default ol.source.VectorEvent;
}

declare module 'ol/source/VectorTile' {
  export default ol.source.VectorTile;
}

declare module 'ol/source/WMTS' {
  export default ol.source.WMTS;
  export function optionsFromCapabilities(wmtsCap: ol.GlobalObject, config: ol.GlobalObject): any;
}

declare module 'ol/source/XYZ' {
  export default ol.source.XYZ;
}

declare module 'ol/source/Zoomify' {
  export default ol.source.Zoomify;
}

// FORMATS

declare module 'ol/format' {
  export default ol.format;
}

declare module 'ol/format/EsriJSON' {
  export default ol.format.EsriJSON;
}

declare module 'ol/format/Feature' {
  export default ol.format.Feature;
}

declare module 'ol/format/GeoJSON' {
  export default ol.format.GeoJSON;
}

declare module 'ol/format/GML' {
  export default ol.format.GML;
}

declare module 'ol/format/GML2' {
  export default ol.format.GML2;
}

declare module 'ol/format/GML3' {
  export default ol.format.GML3;
}

declare module 'ol/format/GMLBase' {
  export default ol.format.GMLBase;
}

declare module 'ol/format/GPX' {
  export default ol.format.GPX;
}

declare module 'ol/format/IGC' {
  export default ol.format.IGC;
}

declare module 'ol/format/JSONFeature' {
  export default ol.format.JSONFeature;
}

declare module 'ol/format/KML' {
  export default ol.format.KML;
}

declare module 'ol/format/MVT' {
  export default ol.format.MVT;
}

declare module 'ol/format/OSMXML' {
  export default ol.format.OSMXML;
}

declare module 'ol/format/Polyline' {
  export default ol.format.Polyline;
}

declare module 'ol/format/TextFeature' {
  export default ol.format.TextFeature;
}

declare module 'ol/format/TopoJSON' {
  export default ol.format.TopoJSON;
}

declare module 'ol/format/WFS' {
  export default ol.format.WFS;
}

declare module 'ol/format/WKT' {
  export default ol.format.WKT;
}

declare module 'ol/format/WMSCapabilities' {
  export default ol.format.WMSCapabilities;
}

declare module 'ol/format/WMSGetFeatureInfo' {
  export default ol.format.WMSGetFeatureInfo;
}

declare module 'ol/format/WMTSCapabilities' {
  export default ol.format.WMTSCapabilities;
}

declare module 'ol/format/XML' {
  export default ol.format.XML;
}

declare module 'ol/format/XMLFeature' {
  export default ol.format.XMLFeature;
}

// STYLES

declare module 'ol/style' {
  export default ol.style;
}

declare module 'ol/style/AtlasManager' {
  export default ol.style.AtlasManager;
}

declare module 'ol/style/Circle' {
  export default ol.style.Circle;
}

declare module 'ol/style/Fill' {
  export default ol.style.Fill;
}

declare module 'ol/style/Icon' {
  export default ol.style.Icon;
}

declare module 'ol/style/Image' {
  export default ol.style.Image;
}

declare module 'ol/style/RegularShape' {
  export default ol.style.RegularShape;
}

declare module 'ol/style/Stroke' {
  export default ol.style.Stroke;
}

declare module 'ol/style/Style' {
  export default ol.style.Style;
}

declare module 'ol/style/Text' {
  export default ol.style.Text;
}

// INTERACTIONS

declare module 'ol/interaction' {
  export default ol.interaction;
}

declare module 'ol/interaction/DoubleClickZoom' {
  export default ol.interaction.DoubleClickZoom;
}

declare module 'ol/interaction/DragAndDrop' {
  export default ol.interaction.DragAndDrop;
}

declare module 'ol/interaction/DragBox' {
  export default ol.interaction.DragBox;
}

declare module 'ol/interaction/DragPan' {
  export default ol.interaction.DragPan;
}

declare module 'ol/interaction/DragRotate' {
  export default ol.interaction.DragRotate;
}

declare module 'ol/interaction/DragRotateAndZoom' {
  export default ol.interaction.DragRotateAndZoom;
}

declare module 'ol/interaction/DragZoom' {
  export default ol.interaction.DragZoom;
}

declare module 'ol/interaction/Draw' {
  export default ol.interaction.Draw;
}

declare module 'ol/interaction/Interaction' {
  export default ol.interaction.Interaction;
}

declare module 'ol/interaction/KeyboardPan' {
  export default ol.interaction.KeyboardPan;
}

declare module 'ol/interaction/KeyboardZoom' {
  export default ol.interaction.KeyboardZoom;
}

declare module 'ol/interaction/Modify' {
  export default ol.interaction.Modify;
}

declare module 'ol/interaction/MouseWheelZoom' {
  export default ol.interaction.MouseWheelZoom;
}

declare module 'ol/interaction/PinchRotate' {
  export default ol.interaction.PinchRotate;
}

declare module 'ol/interaction/PinchZoom' {
  export default ol.interaction.PinchZoom;
}

declare module 'ol/interaction/Pointer' {
  export default ol.interaction.Pointer;
}

declare module 'ol/interaction/Select' {
  export default ol.interaction.Select;
}

declare module 'ol/interaction/Snap' {
  export default ol.interaction.Snap;
}

declare module 'ol/interaction/Translate' {
  export default ol.interaction.Translate;
}

// CONTROLS

declare module 'ol/control' {
  export default ol.control;
}

declare module 'ol/control/Attribution' {
  export default ol.control.Attribution;
}

declare module 'ol/control/Control' {
  export default ol.control.Control;
}

declare module 'ol/control/FullScreen' {
  export default ol.control.FullScreen;
}

declare module 'ol/control/MousePosition' {
  export default ol.control.MousePosition;
}

declare module 'ol/control/OverviewMap' {
  export default ol.control.OverviewMap;
}

declare module 'ol/control/Rotate' {
  export default ol.control.Rotate;
}

declare module 'ol/control/ScaleLine' {
  export default ol.control.ScaleLine;
}

declare module 'ol/control/Zoom' {
  export default ol.control.Zoom;
}

declare module 'ol/control/ZoomSlider' {
  export default ol.control.ZoomSlider;
}

declare module 'ol/control/ZoomToExtent' {
  export default ol.control.ZoomToExtent;
}

// GEOM

declare module 'ol/geom' {
  export default ol.geom;
}

declare module 'ol/geom/Circle' {
  export default ol.geom.Circle;
}

declare module 'ol/geom/Geometry' {
  export default ol.geom.Geometry;
}

declare module 'ol/geom/GeometryCollection' {
  export default ol.geom.GeometryCollection;
}

declare module 'ol/geom/LinearRing' {
  export default ol.geom.LinearRing;
}

declare module 'ol/geom/LineString' {
  export default ol.geom.LineString;
}

declare module 'ol/geom/MultiLineString' {
  export default ol.geom.MultiLineString;
}

declare module 'ol/geom/MultiPoint' {
  export default ol.geom.MultiPoint;
}

declare module 'ol/geom/MultiPolygon' {
  export default ol.geom.MultiPolygon;
}

declare module 'ol/geom/Point' {
  export default ol.geom.Point;
}

declare module 'ol/geom/Polygon' {
  export default ol.geom.Polygon;
}

declare module 'ol/geom/SimpleGeometry' {
  export default ol.geom.SimpleGeometry;
}

// TILEGRID

declare module 'ol/tilegrid' {
  export default ol.tilegrid;
}

declare module 'ol/tilegrid/TileGrid' {
  export default ol.tilegrid.TileGrid;
}

declare module 'ol/tilegrid/WMTS' {
  export default ol.tilegrid.WMTS;
}

// PROJ

declare module 'ol/proj';

declare module 'ol/proj/proj4';

declare module 'ol/proj/Projection' {
  export default ol.proj.Projection;
}

declare module 'proj4';

// OTHERS

declare module 'ol/easing' {
  export default ol.easing;
  export function easeIn(t: number): number;
  export function easeOut(t: number): number;
  export function inAndOut(t: number): number;
  export function linear(t: number): number;
  export function upAndDown(t: number): number;
}



declare module 'ol/sphere' {
  export function getArea(geometry: ol.geom.Geometry, opt_options: any): number;
  export function getDistance(c1: ol.Coordinate[], c2: ol.Coordinate[], opt_radius: number): number;
  export function getLength(geometry: ol.geom.Geometry, opt_options: any): number;
}
