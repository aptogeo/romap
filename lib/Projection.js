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
var React = require("react");
var Projection_1 = require("ol/proj/Projection");
var proj4_1 = require("proj4");
var proj_1 = require("ol/proj");
var Projection = /** @class */ (function (_super) {
    __extends(Projection, _super);
    function Projection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Projection.prototype.componentWillMount = function () {
        this.code = this.props.code;
        this.wkt = this.props.wkt;
        this.lonLatValidity = this.props.lonLatValidity;
        this.name = this.props.name;
        this.remarks = this.props.remarks;
        proj4_1.default.defs(this.code, this.wkt);
        this.olProjection = new Projection_1.default({
            code: this.code
        });
        proj_1.addProjection(this.olProjection);
        if (Array.isArray(this.lonLatValidity)) {
            var extent = proj_1.transformExtent(this.lonLatValidity, 'EPSG:4326', this.olProjection);
            this.olProjection.setExtent(extent);
        }
    };
    Projection.prototype.render = function () {
        return null;
    };
    return Projection;
}(React.Component));
exports.Projection = Projection;
//# sourceMappingURL=Projection.js.map