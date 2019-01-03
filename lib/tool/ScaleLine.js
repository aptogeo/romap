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
var proj_1 = require("ol/proj");
var MapContext_1 = require("../MapContext");
var BaseTool_1 = require("./BaseTool");
var LEADING_DIGITS = [1, 2, 5];
var ScaleLine = /** @class */ (function (_super) {
    __extends(ScaleLine, _super);
    function ScaleLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onViewChange = function () {
            _this.context.olMap.getView().on('propertychange', _this.onResolutionChange);
            _this.onResolutionChange();
        };
        _this.onResolutionChange = function () {
            var view = _this.context.olMap.getView();
            if (view == null) {
                return;
            }
            var projection = view.getProjection();
            var units = projection.getUnits();
            var center = view.getCenter();
            var resolution = view.getResolution();
            var pointResolution = proj_1.getPointResolution(projection, resolution, center, 'm');
            var nominalCount = _this.props.minWidth * pointResolution;
            var suffix = '';
            if (units == null) {
                return;
            }
            if (units.match(/m/i) || units.match(/meter/i) || units.match(/d/i) || units.match(/degree/i)) {
                if (nominalCount < 0.001) {
                    suffix = 'μm';
                    pointResolution *= 1000000;
                }
                else if (nominalCount < 1) {
                    suffix = 'mm';
                    pointResolution *= 1000;
                }
                else if (nominalCount < 1000) {
                    suffix = 'm';
                }
                else {
                    suffix = 'km';
                    pointResolution /= 1000;
                }
            }
            else if (units.match(/ft/i) || units.match(/feet/i) || units.match(/foot/i)) {
                if (nominalCount < 0.9144) {
                    suffix = 'in';
                    pointResolution *= 39.37;
                }
                else if (nominalCount < 1609.344) {
                    suffix = 'ft';
                    pointResolution /= 0.30480061;
                }
                else {
                    suffix = 'mi';
                    pointResolution /= 1609.3472;
                }
            }
            else {
                return;
            }
            var i = 3 * Math.floor(Math.log(_this.props.minWidth * pointResolution) / Math.log(10));
            var count;
            var width;
            while (true) {
                count = LEADING_DIGITS[((i % 3) + 3) % 3] * Math.pow(10, Math.floor(i / 3));
                width = Math.round(count / pointResolution);
                if (isNaN(width)) {
                    _this.divScaleLine.style.display = 'none';
                    return;
                }
                else if (width >= _this.props.minWidth) {
                    break;
                }
                ++i;
            }
            _this.divScaleLine.style.display = '';
            var label = count + ' ' + suffix;
            _this.divScaleLineLabel.innerHTML = label;
            _this.divScaleLineInner.style.width = width + 'px';
        };
        return _this;
    }
    ScaleLine.prototype.componentDidMount = function () {
        var _this = this;
        this.context.olMap.on('change:view', this.onViewChange);
        setTimeout(function () {
            _this.onViewChange();
        }, 100);
    };
    ScaleLine.prototype.componentWillUnmount = function () {
        this.context.olMap.getView().un('propertychange', this.onResolutionChange);
        this.context.olMap.un('change:view', this.onViewChange);
    };
    ScaleLine.prototype.render = function () {
        var _this = this;
        if (this.props.disable === true) {
            return null;
        }
        var i18n = this.props.i18n;
        var scanlineTitle = i18n && i18n.scanlineTitle ? i18n.scanlineTitle : 'Diagonal distance in map center';
        return (React.createElement("div", { ref: function (divScaleLine) {
                _this.divScaleLine = divScaleLine;
            }, className: this.props.className + " ol-unselectable ol-control", title: scanlineTitle },
            React.createElement("div", { ref: function (divScaleLineInner) {
                    _this.divScaleLineInner = divScaleLineInner;
                }, className: this.props.className + "-inner" },
                React.createElement("div", { className: this.props.className + "-parts" },
                    React.createElement("div", { className: this.props.className + "-part1" }),
                    React.createElement("div", { className: this.props.className + "-part2" }))),
            React.createElement("div", { ref: function (divScaleLineLabel) {
                    _this.divScaleLineLabel = divScaleLineLabel;
                }, className: this.props.className + "-label" })));
    };
    ScaleLine.defaultProps = {
        className: 'scaleline',
        minWidth: 64
    };
    ScaleLine.contextType = MapContext_1.mapContext;
    return ScaleLine;
}(BaseTool_1.BaseTool));
exports.ScaleLine = ScaleLine;
//# sourceMappingURL=ScaleLine.js.map