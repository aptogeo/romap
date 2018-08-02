"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Vector_1 = require("ol/source/Vector");
var EsriJSON_1 = require("ol/format/EsriJSON");
var net_1 = require("../net");
var QueryArcGISRest = /** @class */ (function (_super) {
    __extends(QueryArcGISRest, _super);
    function QueryArcGISRest(options) {
        var _this = this;
        var opt = {};
        lodash_1.assign(opt, options, {
            useSpatialIndex: true,
            loader: function (extent, resolution, projection) {
                // ArcGIS Server only wants the numeric portion of the projection ID.
                var srid = projection
                    .getCode()
                    .split(':')
                    .pop();
                if (!lodash_1.isEqual(_this.srid, srid)) {
                    _this.srid = srid;
                    _this.extent = null;
                    _this.resolution = null;
                    _this.clear();
                    return;
                }
                if (_this.loadedFeatures != null) {
                    _this.dispatchEvent('imageloadstart');
                    _this.addFeatures(_this.loadedFeatures);
                    _this.dispatchEvent('imageloadend');
                }
            },
            strategy: function (extent, resolution) {
                if (_this.srid != null) {
                    if (!lodash_1.isEqual(_this.extent, extent) || !lodash_1.isEqual(_this.resolution, resolution)) {
                        _this.dispatchEvent('imageloadstart');
                        _this.load(extent, _this.srid).then(function (features) {
                            _this.loadedFeatures = features;
                            _this.clear();
                            _this.dispatchEvent('imageloadend');
                        }, function () {
                            _this.loadedFeatures = [];
                            _this.clear();
                            _this.dispatchEvent('imageloaderror');
                        });
                    }
                }
                _this.extent = extent;
                _this.resolution = resolution;
                return [extent];
            }
        });
        _this = _super.call(this, opt) || this;
        _this.where = options.where;
        _this.srid = null;
        _this.loadedFeatures = null;
        _this.format = new EsriJSON_1.default();
        return _this;
    }
    QueryArcGISRest.prototype.load = function (extent, srid) {
        var _this = this;
        var geometry = encodeURIComponent("{\"xmin\":" + extent[0] + ",\"ymin\":" + extent[1] + ",\"xmax\":" + extent[2] + ",\"ymax\":" + extent[3] + ",\"spatialReference\":{\"wkid\":" + srid + "}}");
        var url = this.getUrl() + "/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" + geometry + "&geometryType=esriGeometryEnvelope&inSR=" + srid + "&outFields=*&outSR=" + srid;
        if (this.where) {
            url += "&where=" + this.where;
        }
        return net_1.send({ url: url, contentType: 'application/json' }).then(function (json) { return _this.format.readFeatures(json); }, function () {
            console.error("Request error " + url);
        });
    };
    return QueryArcGISRest;
}(Vector_1.default));
exports.QueryArcGISRest = QueryArcGISRest;
//# sourceMappingURL=QueryArcGISRest.js.map