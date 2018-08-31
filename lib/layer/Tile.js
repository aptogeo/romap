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
var Tile_1 = require("ol/layer/Tile");
var Base_1 = require("./Base");
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tile.prototype.createOlLayer = function () {
        return new Tile_1.default();
    };
    Tile.prototype.checkProps = function (props) {
        _super.prototype.checkProps.call(this, props);
        this.setSource(props.source);
    };
    Tile.prototype.setSource = function (source) {
        this.source = source;
        if (this.source == null) {
            this.source = undefined;
        }
        this.getOlLayer().setSource(source);
    };
    return Tile;
}(Base_1.Base));
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map