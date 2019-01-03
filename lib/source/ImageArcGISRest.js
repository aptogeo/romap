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
var ImageArcGISRest_1 = require("ol/source/ImageArcGISRest");
var ImageArcGISRest = /** @class */ (function (_super) {
    __extends(ImageArcGISRest, _super);
    function ImageArcGISRest(options) {
        var _this = _super.call(this, options) || this;
        _this.label = options.label ? options.label : _this.constructor.name;
        return _this;
    }
    ImageArcGISRest.prototype.query = function (request) {
        var features = [];
        return Promise.resolve({
            request: request,
            features: features
        });
    };
    ImageArcGISRest.prototype.getToc = function () {
        var tocElements = [];
        tocElements.push({
            name: this.label,
            tocElements: null,
            tocLegendElements: null
        });
        return Promise.resolve({ tocElements: tocElements });
    };
    return ImageArcGISRest;
}(ImageArcGISRest_1.default));
exports.ImageArcGISRest = ImageArcGISRest;
//# sourceMappingURL=ImageArcGISRest.js.map