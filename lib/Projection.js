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
    function Projection(props) {
        var _this = _super.call(this, props) || this;
        _this.projectionInfo = new ProjectionInfo();
        _this.projectionInfo.code = props.code;
        _this.projectionInfo.wkt = props.wkt;
        _this.projectionInfo.lonLatValidity = props.lonLatValidity;
        _this.projectionInfo.name = props.name;
        _this.projectionInfo.remarks = props.remarks;
        proj4_2.default.defs(_this.projectionInfo.code, _this.projectionInfo.wkt);
        console.info('Register projection ' + _this.projectionInfo.code + ' - ' + _this.projectionInfo.name);
        proj4_1.register(proj4_2.default);
        _this.projectionInfo.olProjection = proj_1.get(_this.projectionInfo.code);
        if (Array.isArray(_this.projectionInfo.lonLatValidity)) {
            var extent = proj_1.transformExtent(_this.projectionInfo.lonLatValidity, 'EPSG:4326', _this.projectionInfo.olProjection);
            _this.projectionInfo.olProjection.setExtent(extent);
        }
        projMap.set(_this.projectionInfo.code, _this.projectionInfo);
        return _this;
    }
    Projection.prototype.render = function () {
        return null;
    };
    return Projection;
}(React.Component));
exports.Projection = Projection;
//# sourceMappingURL=Projection.js.map