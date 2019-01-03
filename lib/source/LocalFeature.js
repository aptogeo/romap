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
var Projection_1 = require("ol/proj/Projection");
var AbstractFeature_1 = require("./AbstractFeature");
var LocalFeature = /** @class */ (function (_super) {
    __extends(LocalFeature, _super);
    function LocalFeature(options) {
        var _this = _super.call(this, lodash_1.assign({}, options, {
            loader: function (extent, resolution, projection) {
                if (!lodash_1.isEqual(projection, _this.viewProjection)) {
                    _this.oldViewProjection = _this.viewProjection;
                    _this.viewProjection = projection;
                    _this.projectAll();
                }
                else {
                    _this.reportAll();
                }
                if (_this.optionLoader) {
                    _this.optionLoader.call(_this, extent, resolution, projection);
                }
            },
            strategy: function (extent, resolution) {
                var features = _this.getFeatures();
                if (!lodash_1.isEqual(_this.lastExtent, extent) ||
                    !lodash_1.isEqual(_this.lastResolution, resolution) ||
                    !_this.savedFeatures ||
                    _this.savedFeatures.length !== features.length) {
                    _this.lastExtent = extent;
                    _this.lastResolution = resolution;
                    _this.savedFeatures = features.slice(0);
                    _this.clearForReload();
                }
                if (_this.optionStrategy) {
                    return _this.optionStrategy.call(_this, extent, resolution);
                }
                return [extent];
            }
        })) || this;
        _this.handleAddFeature = function (event) {
            _this.setOriginal(event.feature);
        };
        _this.handleChangeFeatureGeometry = function (event) {
            _this.setOriginal(event.feature);
        };
        _this.optionLoader = options.loader;
        _this.optionStrategy = options.strategy;
        _this.on('addfeature', _this.handleAddFeature, _this);
        _this.viewProjection = null;
        _this.oldViewProjection = null;
        _this.savedFeatures = null;
        return _this;
    }
    LocalFeature.prototype.clearForReload = function () {
        _super.prototype.clear.call(this, true);
    };
    LocalFeature.prototype.clear = function (fast) {
        this.savedFeatures = null;
        _super.prototype.clear.call(this, fast);
    };
    LocalFeature.prototype.projectAll = function () {
        if (this.savedFeatures) {
            for (var _i = 0, _a = this.savedFeatures; _i < _a.length; _i++) {
                var savedFeature = _a[_i];
                if (savedFeature.get('originalProjection') && savedFeature.get('originalGeometry') && this.viewProjection) {
                    var geom = savedFeature.get('originalGeometry').clone();
                    geom.transform(savedFeature.get('originalProjection'), this.viewProjection);
                    savedFeature.setGeometry(geom);
                }
                else if (this.oldViewProjection && this.viewProjection && savedFeature.getGeometry()) {
                    savedFeature.getGeometry().transform(this.oldViewProjection, this.viewProjection);
                }
            }
            this.addFeatures(this.savedFeatures);
        }
        this.savedFeatures = null;
    };
    LocalFeature.prototype.reportAll = function () {
        if (this.savedFeatures) {
            this.un('addfeature', this.handleAddFeature, this);
            this.addFeatures(this.savedFeatures);
            this.on('addfeature', this.handleAddFeature, this);
        }
        this.savedFeatures = null;
    };
    LocalFeature.prototype.setOriginal = function (feature) {
        if (!this.viewProjection || !feature.getGeometry()) {
            return;
        }
        feature.un('change:geometry', this.handleChangeFeatureGeometry, this);
        feature.getGeometry().un('change', this.handleChangeGeometry, this);
        feature.set('originalProjection', new Projection_1.default({ code: this.viewProjection.getCode() }));
        feature.set('originalGeometry', feature.getGeometry());
        feature.on('change:geometry', this.handleChangeFeatureGeometry, this);
        feature.getGeometry().set('feature', feature);
        feature.getGeometry().on('change', this.handleChangeGeometry, this);
    };
    LocalFeature.prototype.handleChangeGeometry = function (event) {
        var geometry = event.target;
        var feature = geometry.get('feature');
        feature.setGeometry(geometry);
    };
    return LocalFeature;
}(AbstractFeature_1.AbstractFeature));
exports.LocalFeature = LocalFeature;
//# sourceMappingURL=LocalFeature.js.map