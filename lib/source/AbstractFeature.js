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
var Vector_1 = require("ol/source/Vector");
var AbstractFeature = /** @class */ (function (_super) {
    __extends(AbstractFeature, _super);
    function AbstractFeature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractFeature.prototype.identify = function (request) {
        var olMap = request.olMap, layer = request.layer, pixel = request.pixel, pixelTolerance = request.pixelTolerance, limit = request.limit;
        var features = [];
        olMap.forEachFeatureAtPixel(pixel, function (feature) {
            features.push(feature);
        }, {
            layerFilter: function (l) {
                return layer === l;
            },
            hitTolerance: pixelTolerance
        });
        return Promise.resolve({
            request: request,
            features: features
        });
    };
    AbstractFeature.prototype.getToc = function () {
        return Promise.resolve({
            tocElement: []
        });
    };
    return AbstractFeature;
}(Vector_1.default));
exports.AbstractFeature = AbstractFeature;
//# sourceMappingURL=AbstractFeature.js.map