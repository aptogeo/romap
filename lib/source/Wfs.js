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
var GeoJSON_1 = require("ol/format/GeoJSON");
var net_1 = require("../net");
var AbstractExternalFeature_1 = require("./AbstractExternalFeature");
var Wfs = /** @class */ (function (_super) {
    __extends(Wfs, _super);
    function Wfs(options) {
        var _this = _super.call(this, options) || this;
        _this.typename = options.typename;
        _this.format = new GeoJSON_1.default();
        return _this;
    }
    Wfs.prototype.load = function (extent, projectionCode) {
        var _this = this;
        var url = this.getUrl() + "?service=WFS&version=1.1.0&request=GetFeature&typename=" + this.typename + "&outputFormat=application/json&srsname=" + projectionCode + "&bbox=" + extent.join(',') + "," + projectionCode;
        return net_1.send({ url: url, contentType: 'application/json' }).then(function (response) { return _this.format.readFeatures(response.body); }, function () {
            console.error("Request error " + url);
        });
    };
    Wfs.prototype.containsExtent = function (extent1, extent2) {
        return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
    };
    return Wfs;
}(AbstractExternalFeature_1.AbstractExternalFeature));
exports.Wfs = Wfs;
//# sourceMappingURL=Wfs.js.map