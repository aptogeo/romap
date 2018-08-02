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
var VectorTile_1 = require("ol/layer/VectorTile");
var Base_1 = require("./Base");
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vector.prototype.createOlLayer = function () {
        return new VectorTile_1.default({ source: this.props.source });
    };
    Vector.prototype.checkProps = function (props) {
        _super.prototype.checkProps.call(this, props);
        this.setStyle(props.style);
    };
    Vector.prototype.setStyle = function (style) {
        this.style = style;
        if (this.style == null) {
            this.style = undefined;
        }
        this.getOlLayer().setStyle(style);
    };
    return Vector;
}(Base_1.Base));
exports.Vector = Vector;
//# sourceMappingURL=VectorTile.js.map