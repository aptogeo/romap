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
var lodash_1 = require("lodash");
var AbstractFeature_1 = require("./AbstractFeature");
var AbstractExternalFeature = /** @class */ (function (_super) {
    __extends(AbstractExternalFeature, _super);
    function AbstractExternalFeature(options) {
        var _this = this;
        var opt = {};
        lodash_1.assign(opt, options, {
            loader: function (extent, resolution, projection) {
                var projectionCode = projection.getCode();
                if (!lodash_1.isEqual(_this.projectionCode, projectionCode)) {
                    _this.projectionCode = projectionCode;
                    _this.extent = null;
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
                if (_this.projectionCode != null && (_this.extent == null || !_this.containsExtent(_this.extent, extent))) {
                    _this.dispatchEvent('imageloadstart');
                    _this.load(extent, _this.projectionCode).then(function (features) {
                        _this.loadedFeatures = features;
                        _this.clear();
                        _this.dispatchEvent('imageloadend');
                    }, function () {
                        _this.loadedFeatures = [];
                        _this.clear();
                        _this.dispatchEvent('imageloaderror');
                    });
                    _this.extent = extent;
                }
                return [extent];
            }
        });
        _this = _super.call(this, opt) || this;
        _this.projectionCode = null;
        _this.loadedFeatures = null;
        return _this;
    }
    AbstractExternalFeature.prototype.load = function (extent, projectionCode) {
        return Promise.resolve([]);
    };
    AbstractExternalFeature.prototype.containsExtent = function (extent1, extent2) {
        return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
    };
    return AbstractExternalFeature;
}(AbstractFeature_1.AbstractFeature));
exports.AbstractExternalFeature = AbstractExternalFeature;
//# sourceMappingURL=AbstractExternalFeature.js.map