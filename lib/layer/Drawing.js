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
var Vector_1 = require("ol/layer/Vector");
var LocalFeature_1 = require("../source/LocalFeature");
var Base_1 = require("./Base");
var Drawing = /** @class */ (function (_super) {
    __extends(Drawing, _super);
    function Drawing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Drawing.prototype.createOlLayer = function () {
        return new Vector_1.default({
            source: new LocalFeature_1.LocalFeature({
                wrapX: false
            })
        });
    };
    Drawing.prototype.checkProps = function (props) {
        _super.prototype.checkProps.call(this, props);
        this.setStyle(props.style);
    };
    Drawing.prototype.setStyle = function (style) {
        this.style = style;
        if (this.style == null) {
            this.style = undefined;
        }
        this.getOlLayer().setStyle(style);
    };
    return Drawing;
}(Base_1.Base));
exports.Drawing = Drawing;
//# sourceMappingURL=Drawing.js.map