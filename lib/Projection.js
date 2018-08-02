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
var proj4_1 = require("ol/proj/proj4");
var proj4_2 = require("proj4");
var proj_1 = require("ol/proj");
var projMap = new Map();
function getProjectionInfo(code) {
    return projMap.get(code);
}
exports.getProjectionInfo = getProjectionInfo;
var ProjectionInfo = /** @class */ (function () {
    function ProjectionInfo() {
    }
    return ProjectionInfo;
}());
exports.ProjectionInfo = ProjectionInfo;
var Projection = /** @class */ (function (_super) {
    __extends(Projection, _super);
    function Projection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Projection.prototype.componentWillMount = function () {
        this.projectionInfo = new ProjectionInfo();
        this.projectionInfo.code = this.props.code;
        this.projectionInfo.wkt = this.props.wkt;
        this.projectionInfo.lonLatValidity = this.props.lonLatValidity;
        this.projectionInfo.name = this.props.name;
        this.projectionInfo.remarks = this.props.remarks;
        proj4_2.default.defs(this.projectionInfo.code, this.projectionInfo.wkt);
        console.info('Register projection ' + this.projectionInfo.code + ' - ' + this.projectionInfo.name);
        proj4_1.register(proj4_2.default);
        this.projectionInfo.olProjection = proj_1.get(this.projectionInfo.code);
        if (Array.isArray(this.projectionInfo.lonLatValidity)) {
            var extent = proj_1.transformExtent(this.projectionInfo.lonLatValidity, 'EPSG:4326', this.projectionInfo.olProjection);
            this.projectionInfo.olProjection.setExtent(extent);
        }
        projMap.set(this.projectionInfo.code, this.projectionInfo);
    };
    Projection.prototype.render = function () {
        return null;
    };
    return Projection;
}(React.Component));
exports.Projection = Projection;
//# sourceMappingURL=Projection.js.map