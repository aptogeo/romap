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
var GeoJSON_1 = require("ol/format/GeoJSON");
var net_1 = require("../net");
var WfsSource = /** @class */ (function (_super) {
    __extends(WfsSource, _super);
    function WfsSource(options) {
        var _this = this;
        var opt = {};
        lodash_1.assign(opt, options, {
            useSpatialIndex: true,
            loader: function (extent, resolution, projection) {
                var projectionCode = projection.getCode();
                if (!lodash_1.isEqual(_this.projectionCode, projectionCode)) {
                    _this.projectionCode = projectionCode;
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
                if (!lodash_1.isEqual(_this.extent, extent) || !lodash_1.isEqual(_this.resolution, resolution)) {
                    _this.dispatchEvent('imageloadstart');
                    if (_this.projectionCode != null) {
                        _this.load(extent, _this.projectionCode).then(function (features) {
                            _this.loadedFeatures = features;
                            _this.clear();
                            _this.dispatchEvent('imageloadend');
                        }, function () {
                            _this.loadedFeatures = [];
                            _this.clear();
                            _this.dispatchEvent('imageloaderror');
                        });
                    }
                    _this.extent = extent;
                    _this.resolution = resolution;
                }
                return [extent];
            }
        });
        _this = _super.call(this, opt) || this;
        _this.typename = options.typename;
        _this.projectionCode = null;
        _this.loadedFeatures = null;
        _this.format = new GeoJSON_1.default();
        return _this;
    }
    WfsSource.prototype.load = function (extent, projectionCode) {
        var _this = this;
        var url = this.getUrl() + "?service=WFS&version=1.1.0&request=GetFeature&typename=" + this.typename + "&outputFormat=application/json&srsname=" + projectionCode + "&bbox=" + extent.join(',') + "," + projectionCode;
        return net_1.send({ url: url, contentType: 'application/json' }).then(function (json) { return _this.format.readFeatures(json); }, function () {
            console.error("Request error " + url);
        });
    };
    return WfsSource;
}(Vector_1.default));
exports.default = WfsSource;
//# sourceMappingURL=WfsSource.js.map