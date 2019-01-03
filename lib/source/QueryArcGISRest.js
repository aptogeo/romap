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
var EsriJSON_1 = require("ol/format/EsriJSON");
var bhreq_1 = require("bhreq");
var AbstractExternalFeature_1 = require("./AbstractExternalFeature");
var QueryArcGISRest = /** @class */ (function (_super) {
    __extends(QueryArcGISRest, _super);
    function QueryArcGISRest(options) {
        var _this = _super.call(this, options) || this;
        _this.esriJSONFormat = new EsriJSON_1.default();
        _this.where = options.where;
        return _this;
    }
    QueryArcGISRest.prototype.load = function (extent, projectionCode) {
        var _this = this;
        var srid = projectionCode.split(':').pop();
        var geometry = encodeURIComponent("{\"xmin\":" + extent[0] + ",\"ymin\":" + extent[1] + ",\"xmax\":" + extent[2] + ",\"ymax\":" + extent[3] + ",\"spatialReference\":{\"wkid\":" + srid + "}}");
        var url = this.getUrl() + "/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" + geometry + "&geometryType=esriGeometryEnvelope&inSR=" + srid + "&outFields=*&outSR=" + srid;
        if (this.where) {
            url += "&where=" + this.where;
        }
        return bhreq_1.send({ url: url, contentType: 'application/json' }).then(function (response) { return _this.esriJSONFormat.readFeatures(response.body); }, function () {
            console.error("Request error " + url);
        });
    };
    return QueryArcGISRest;
}(AbstractExternalFeature_1.AbstractExternalFeature));
exports.QueryArcGISRest = QueryArcGISRest;
//# sourceMappingURL=QueryArcGISRest.js.map