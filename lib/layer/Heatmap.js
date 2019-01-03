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
var Heatmap_1 = require("ol/layer/Heatmap");
var BaseLayer_1 = require("./BaseLayer");
var Heatmap = /** @class */ (function (_super) {
    __extends(Heatmap, _super);
    function Heatmap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Heatmap.prototype.createOlLayer = function () {
        return new Heatmap_1.default();
    };
    Heatmap.prototype.updateProps = function (prevProps, nextProps) {
        _super.prototype.updateProps.call(this, prevProps, nextProps);
        if (prevProps.source !== nextProps.source) {
            this.setSource(nextProps.source);
        }
    };
    Heatmap.prototype.setSource = function (source) {
        if (source == null) {
            source = undefined;
        }
        this.getOlLayer().setSource(source);
    };
    Heatmap.prototype.setGradient = function (gradient) {
        if (gradient == null) {
            gradient = undefined;
        }
        this.getOlLayer().setGradient(gradient);
    };
    Heatmap.prototype.setRadius = function (radius) {
        if (radius == null) {
            radius = undefined;
        }
        this.getOlLayer().setRadius(radius);
    };
    Heatmap.prototype.setBlur = function (blur) {
        if (blur == null) {
            blur = undefined;
        }
        this.getOlLayer().setBlur(blur);
    };
    Heatmap.prototype.setShadow = function (shadow) {
        if (shadow == null) {
            shadow = undefined;
        }
        this.getOlLayer().setShadow(shadow);
    };
    Heatmap.prototype.setWeight = function (weight) {
        if (weight == null) {
            weight = undefined;
        }
        this.getOlLayer().setWeight(weight);
    };
    Heatmap.prototype.setRenderMode = function (renderMode) {
        if (renderMode == null) {
            renderMode = undefined;
        }
        this.getOlLayer().setRenderMode(renderMode);
    };
    return Heatmap;
}(BaseLayer_1.BaseLayer));
exports.Heatmap = Heatmap;
//# sourceMappingURL=Heatmap.js.map