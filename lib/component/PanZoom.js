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
var easing_1 = require("ol/easing");
var utils_1 = require("../utils");
var MapContext_1 = require("../MapContext");
var PanZoom = /** @class */ (function (_super) {
    __extends(PanZoom, _super);
    function PanZoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onViewChange = function () {
            _this.context.olMap.getView().on('propertychange', _this.onResolutionChange);
            _this.onResolutionChange();
        };
        _this.onResolutionChange = function () {
            if (_this.btnThumb == null) {
                return;
            }
            var view = _this.context.olMap.getView();
            var resolution = view.getResolution();
            var position = 1 - view.getValueForResolutionFunction()(resolution);
            var computedBtnThumbStyle = window.getComputedStyle(_this.btnThumb);
            var btnThumbHeight = _this.btnThumb.offsetHeight +
                parseFloat(computedBtnThumbStyle['marginTop']) +
                parseFloat(computedBtnThumbStyle['marginBottom']) +
                1;
            _this.btnThumb.style.top = (_this.containerThumb.offsetHeight - btnThumbHeight) * position - btnThumbHeight + 'px';
        };
        _this.handleZoom = function () {
            _this.zoom(1);
        };
        _this.handleUnzoom = function () {
            _this.zoom(-1);
        };
        _this.handleOrigin = function () {
            if (_this.origin) {
                _this.context.olMap.setView(utils_1.cloneView(_this.origin));
            }
        };
        _this.handleLeft = function () {
            _this.handleResetRotation();
            _this.pan(-128, 0);
        };
        _this.handleRight = function () {
            _this.handleResetRotation();
            _this.pan(128, 0);
        };
        _this.handleUp = function () {
            _this.handleResetRotation();
            _this.pan(0, 128);
        };
        _this.handleDown = function () {
            _this.handleResetRotation();
            _this.pan(0, -128);
        };
        _this.handleResetRotation = function () {
            var view = _this.context.olMap.getView();
            if (view.getRotation() !== undefined) {
                view.animate({
                    rotation: 0,
                    duration: 200,
                    easing: easing_1.easingOut
                });
            }
        };
        return _this;
    }
    PanZoom.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.origin = utils_1.cloneView(_this.context.olMap.getView());
            _this.onViewChange();
        }, 100);
        this.context.olMap.on('change:view', this.onViewChange);
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
            easing: easing_1.easingOut
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
            easing: easing_1.easingOut
        });
    };
    PanZoom.prototype.renderPan = function () {
        if (!this.props.showPan) {
            return null;
        }
        var i18n = this.props.i18n;
        var upTitle = i18n && i18n.upTitle ? i18n.upTitle : 'Pan up';
        var downTitle = i18n && i18n.downTitle ? i18n.downTitle : 'Pan down';
        var rightTitle = i18n && i18n.rightTitle ? i18n.rightTitle : 'Pan right';
        var leftTitle = i18n && i18n.leftTitle ? i18n.leftTitle : 'Pan left';
        var originTitle = i18n && i18n.originTitle ? i18n.originTitle : 'Zoom origin';
        var origin = null;
        if (this.props.showOrigin) {
            origin = React.createElement("button", { className: this.props.className + "-origin", onClick: this.handleOrigin, title: originTitle });
        }
        else {
            origin = React.createElement("button", { className: this.props.className + "-noorigin", disabled: true });
        }
        return (React.createElement("div", null,
            React.createElement("button", { className: this.props.className + "-up", onClick: this.handleUp, title: upTitle }),
            React.createElement("button", { className: this.props.className + "-left", onClick: this.handleLeft, title: leftTitle }),
            origin,
            React.createElement("button", { className: this.props.className + "-right", onClick: this.handleRight, title: rightTitle }),
            React.createElement("button", { className: this.props.className + "-down", onClick: this.handleDown, title: downTitle })));
    };
    PanZoom.prototype.renderZoom = function () {
        var _this = this;
        if (!this.props.showZoom) {
            return null;
        }
        var i18n = this.props.i18n;
        var zoomTitle = i18n && i18n.zoomTitle ? i18n.zoomTitle : 'Zoom in';
        var unzoomTitle = i18n && i18n.unzoomTitle ? i18n.unzoomTitle : 'Zoom out';
        var slider = null;
        if (this.props.showZoomSlider) {
            slider = (React.createElement("div", { ref: function (containerThumb) {
                    _this.containerThumb = containerThumb;
                }, className: this.props.className + "-zoom-slider" },
                React.createElement("button", { ref: function (btnThumb) {
                        _this.btnThumb = btnThumb;
                    }, className: this.props.className + "-zoom-slider-thumb" })));
        }
        return (React.createElement("div", null,
            React.createElement("button", { className: this.props.className + "-zoom", onClick: this.handleZoom, title: zoomTitle }),
            slider,
            React.createElement("button", { className: this.props.className + "-unzoom", onClick: this.handleUnzoom, title: unzoomTitle })));
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
                }, className: this.props.className + "-rotate", onClick: this.handleResetRotation, title: rotateTitle },
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
        showZoomSlider: true,
        showPan: true,
        showOrigin: true,
        showRotation: true
    };
    PanZoom.contextType = MapContext_1.mapContext;
    return PanZoom;
}(React.Component));
exports.PanZoom = PanZoom;
//# sourceMappingURL=PanZoom.js.map