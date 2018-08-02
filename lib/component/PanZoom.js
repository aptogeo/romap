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
var PropTypes = require("prop-types");
var easing_1 = require("ol/easing");
var utils_1 = require("../utils");
var PanZoom = /** @class */ (function (_super) {
    __extends(PanZoom, _super);
    function PanZoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanZoom.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.origin = utils_1.cloneView(_this.context.olMap.getView());
        }, 300);
        this.context.olMap.on('postrender', function (event) {
            var frameState = event.frameState;
            if (frameState == null) {
                return;
            }
            var viewState = frameState.viewState;
            if (viewState == null) {
                return;
            }
            var rotation = viewState.rotation;
            if (rotation != null && rotation !== 0) {
                _this.buttonRotate.style.display = '';
                var transform = 'rotate(' + rotation + 'rad)';
                _this.spanRotate.style.msTransform = transform;
                _this.spanRotate.style.webkitTransform = transform;
                _this.spanRotate.style.transform = transform;
            }
            else {
                _this.buttonRotate.style.display = 'none';
            }
        });
    };
    PanZoom.prototype.handleZoom = function (event) {
        this.zoom(1);
    };
    PanZoom.prototype.handleUnzoom = function (event) {
        this.zoom(-1);
    };
    PanZoom.prototype.handleOrigin = function (event) {
        if (this.origin) {
            this.context.olMap.setView(utils_1.cloneView(this.origin));
        }
    };
    PanZoom.prototype.handleLeft = function (event) {
        this.handleResetRotation();
        this.pan(-128, 0);
    };
    PanZoom.prototype.handleRight = function (event) {
        this.handleResetRotation();
        this.pan(128, 0);
    };
    PanZoom.prototype.handleUp = function (event) {
        this.handleResetRotation();
        this.pan(0, 128);
    };
    PanZoom.prototype.handleDown = function (event) {
        this.handleResetRotation();
        this.pan(0, -128);
    };
    PanZoom.prototype.pan = function (deltaX, deltaY) {
        var view = this.context.olMap.getView();
        var res = view.getResolution();
        var center = view.getCenter();
        center[0] += res * deltaX;
        center[1] += res * deltaY;
        if (view.getAnimating()) {
            view.cancelAnimations();
        }
        view.animate({
            center: center,
            duration: 200,
            easing: easing_1.easeOut
        });
    };
    PanZoom.prototype.zoom = function (delta) {
        var view = this.context.olMap.getView();
        var res = view.getResolution();
        if (view.getAnimating()) {
            view.cancelAnimations();
        }
        view.animate({
            resolution: view.constrainResolution(res, delta),
            duration: 200,
            easing: easing_1.easeOut
        });
    };
    PanZoom.prototype.handleResetRotation = function () {
        var view = this.context.olMap.getView();
        if (view.getRotation() !== undefined) {
            view.animate({
                rotation: 0,
                duration: 200,
                easing: easing_1.easeOut
            });
        }
    };
    PanZoom.prototype.renderPan = function () {
        if (!this.props.showPan) {
            return null;
        }
        var i18n = this.props.i18n;
        var upTitle = i18n && i18n.upTitle ? i18n.upTitle : 'Pan north';
        var downTitle = i18n && i18n.downTitle ? i18n.downTitle : 'Pan south';
        var rightTitle = i18n && i18n.rightTitle ? i18n.rightTitle : 'Pan east';
        var leftTitle = i18n && i18n.leftTitle ? i18n.leftTitle : 'Pan west';
        var originTitle = i18n && i18n.originTitle ? i18n.originTitle : 'Zoom extents';
        return (React.createElement("div", null,
            React.createElement("button", { className: this.props.className + "-up", onClick: this.handleUp.bind(this), title: upTitle },
                React.createElement("span", { className: this.props.className + "-span-up" })),
            React.createElement("button", { className: this.props.className + "-left", onClick: this.handleLeft.bind(this), title: leftTitle },
                React.createElement("span", { className: this.props.className + "-span-left" })),
            React.createElement("button", { className: this.props.className + "-origin", onClick: this.handleOrigin.bind(this), title: originTitle },
                React.createElement("span", { className: this.props.className + "-span-origin" })),
            React.createElement("button", { className: this.props.className + "-right", onClick: this.handleRight.bind(this), title: rightTitle },
                React.createElement("span", { className: this.props.className + "-span-right" })),
            React.createElement("button", { className: this.props.className + "-down", onClick: this.handleDown.bind(this), title: downTitle },
                React.createElement("span", { className: this.props.className + "-span-down" }))));
    };
    PanZoom.prototype.renderZoom = function () {
        if (!this.props.showZoom) {
            return null;
        }
        var i18n = this.props.i18n;
        var zoomTitle = i18n && i18n.zoomTitle ? i18n.zoomTitle : 'Zoom in';
        var unzoomTitle = i18n && i18n.unzoomTitle ? i18n.unzoomTitle : 'Zoom out';
        return (React.createElement("div", null,
            React.createElement("button", { className: this.props.className + "-zoom", onClick: this.handleZoom.bind(this), title: zoomTitle },
                React.createElement("span", { className: this.props.className + "-span-zoom" })),
            React.createElement("button", { className: this.props.className + "-unzoom", onClick: this.handleUnzoom.bind(this), title: unzoomTitle },
                React.createElement("span", { className: this.props.className + "-span-unzoom" }))));
    };
    PanZoom.prototype.renderRotation = function () {
        var _this = this;
        if (!this.props.showRotation) {
            return null;
        }
        var i18n = this.props.i18n;
        var rotateTitle = i18n && i18n.rotateTitle ? i18n.rotateTitle : 'Set map orientation to north up';
        return (React.createElement("div", null,
            React.createElement("button", { ref: function (buttonRotate) {
                    _this.buttonRotate = buttonRotate;
                }, className: this.props.className + "-rotate", onClick: this.handleResetRotation.bind(this), title: rotateTitle },
                React.createElement("span", { ref: function (spanRotate) {
                        _this.spanRotate = spanRotate;
                    }, className: this.props.className + "-span-rotate" }))));
    };
    PanZoom.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className + " ol-unselectable ol-control" },
            this.renderPan(),
            this.renderZoom(),
            this.renderRotation()));
    };
    PanZoom.defaultProps = {
        className: 'panzoom',
        showZoom: true,
        showPan: true,
        showRotation: true
    };
    PanZoom.contextTypes = {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.object
    };
    return PanZoom;
}(React.Component));
exports.PanZoom = PanZoom;
//# sourceMappingURL=PanZoom.js.map