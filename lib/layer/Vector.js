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
var Vector_1 = require("ol/layer/Vector");
var BaseLayer_1 = require("./BaseLayer");
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vector.prototype.createOlLayer = function () {
        return new Vector_1.default();
    };
    Vector.prototype.updateProps = function (prevProps, nextProps) {
        _super.prototype.updateProps.call(this, prevProps, nextProps);
        if (prevProps.source !== nextProps.source) {
            this.setSource(nextProps.source);
        }
        if (prevProps.style != nextProps.style) {
            this.setStyle(nextProps.style);
        }
    };
    Vector.prototype.setSource = function (source) {
        if (source == null) {
            source = undefined;
        }
        this.getOlLayer().setSource(source);
    };
    Vector.prototype.setStyle = function (style) {
        if (style == null) {
            style = undefined;
        }
        this.getOlLayer().setStyle(style);
    };
    return Vector;
}(BaseLayer_1.BaseLayer));
exports.Vector = Vector;
//# sourceMappingURL=Vector.js.map