"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = require("ol/source/Vector");
var GeoJSON_1 = require("ol/format/GeoJSON");
var boolean_disjoint_1 = require("@turf/boolean-disjoint");
var AbstractFeature = /** @class */ (function (_super) {
    __extends(AbstractFeature, _super);
    function AbstractFeature(options) {
        var _this = _super.call(this, options) || this;
        _this.queryGeoJSONFormat = new GeoJSON_1.default();
        _this.constructor.name;
        _this.label = options.label ? options.label : _this.constructor.name;
        return _this;
    }
    AbstractFeature.prototype.query = function (request) {
        var _this = this;
        var olMap = request.olMap, geometry = request.geometry, geometryProjection = request.geometryProjection, limit = request.limit;
        var features = [];
        var destGeometry = geometry.transform(geometryProjection, olMap.getView().getProjection());
        var extent = destGeometry.getExtent();
        var jsonGeom = this.queryGeoJSONFormat.writeGeometryObject(destGeometry);
        this.forEachFeatureIntersectingExtent(extent, function (feature) {
            if (features.length < limit) {
                var jsonResGeom = _this.queryGeoJSONFormat.writeGeometryObject(feature.getGeometry());
                if (!boolean_disjoint_1.default(jsonResGeom, jsonGeom)) {
                    features.push(feature);
                }
            }
        });
        return Promise.resolve({
            request: request,
            features: features
        });
    };
    AbstractFeature.prototype.getToc = function () {
        var tocElements = [];
        tocElements.push({
            name: this.label,
            tocElements: null,
            tocLegendElements: null
        });
        return Promise.resolve({ tocElements: tocElements });
    };
    return AbstractFeature;
}(Vector_1.default));
exports.AbstractFeature = AbstractFeature;
//# sourceMappingURL=AbstractFeature.js.map