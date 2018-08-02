// LAYERS

declare module 'ol/layer/Base' {
  export default ol.layer.Base;
}

declare module 'ol/layer/Image' {
  export default ol.layer.Image;
}

declare module 'ol/layer/Vector' {
  export default ol.layer.Vector;
}

declare module 'ol/layer/Tile' {
  export default ol.layer.Tile;
}

declare module 'ol/layer/VectorTile' {
  export default ol.layer.VectorTile;
}

declare module 'ol/layer/Group' {
  export default ol.layer.Group;
}

// SOURCES

declare module 'ol/source/VectorTile' {
  export default ol.source.VectorTile;
}

declare module 'ol/source/Vector' {
  export default ol.source.Vector;
}

declare module 'ol/source/XYZ' {
  export default ol.source.XYZ;
}

declare module 'ol/source/ImageArcGISRest' {
  export default class extends ol.source.ImageArcGISRest {
    public imageSize_: number[];
    public ratio_: number;
  }
}

declare module 'ol/source/BingMaps' {
  export default ol.source.BingMaps;
}

declare module 'ol/source/ImageStatic' {
  export default ol.source.ImageStatic;
}

declare module 'ol/source/ImageWMS' {
  export default ol.source.ImageWMS;
}

declare module 'ol/source/TileWMS' {
  export default ol.source.TileWMS;
}

declare module 'ol/source/WMTS' {
  export default ol.source.WMTS;
}

// FORMATS

declare module 'ol/format/EsriJSON' {
  export default ol.format.EsriJSON;
}

declare module 'ol/format/GML2' {
  export default ol.format.GML2;
}

declare module 'ol/format/GML3' {
  export default ol.format.GML3;
}

declare module 'ol/format/GeoJSON' {
  export default ol.format.GeoJSON;
}

declare module 'ol/format/MVT' {
  export default ol.format.MVT;
}

declare module 'ol/format/WMSCapabilities' {
  export default ol.format.WMSCapabilities;
}

declare module 'ol/format/WMTSCapabilities' {
  export default ol.format.WMTSCapabilities;
}

declare module 'ol/format/WMSGetFeatureInfo' {
  export default ol.format.WMSGetFeatureInfo;
}

// STYLES

declare module 'ol/style/Style' {
  export default ol.style.Style;
}

declare module 'ol/style/Circle' {
  export default ol.style.Circle;
}

declare module 'ol/style/Text' {
  export default ol.style.Text;
}

declare module 'ol/style/Icon' {
  export default ol.style.Icon;
}

declare module 'ol/style/Fill' {
  export default ol.style.Fill;
}

declare module 'ol/style/Stroke' {
  export default ol.style.Stroke;
}

// PROJECTION

declare module 'proj4';

declare module 'ol/proj';

declare module 'ol/proj/Projection' {
  export default ol.proj.Projection;
}

// OTHERS

declare module 'ol/Map' {
  export default class extends ol.Map {
    public increaseLoadingCounter: any;
    public decreaseLoadingCounter: any;
  }
}

declare module 'ol/View' {
  export default ol.View;
}

declare module 'ol/easing';

declare module 'ol/tilegrid/TileGrid' {
  export default ol.tilegrid.TileGrid;
}

declare module 'ol/Overlay' {
  export default ol.Overlay;
}

declare module 'ol/Feature' {
  export default ol.Feature;
}
