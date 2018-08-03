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
var Map_1 = require("ol/Map");
var Overlay_1 = require("ol/Overlay");
var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Overlay.prototype.componentWillMount = function () {
        this.setState({
            overlay: null
        });
    };
    Overlay.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Overlay.prototype.componentDidUpdate = function () {
        if (this.overlayDiv != null && this.state.overlay == null) {
            this.createOverlay();
        }
        if (this.state.overlay == null) {
            return;
        }
        this.state.overlay.setPositioning(this.props.positioning);
        this.computePosition();
    };
    Overlay.prototype.componentWillUnmount = function () {
        this.context.olMap.removeOverlay(this.state.overlay);
    };
    Overlay.prototype.createOverlay = function () {
        var overlay = new Overlay_1.default({
            element: this.overlayDiv.children[0],
            stopEvent: false,
            autoPan: this.props.autoPan
        });
        this.context.olMap.addOverlay(overlay);
        this.setState({
            overlay: overlay
        });
    };
    Overlay.prototype.computePosition = function () {
        var _this = this;
        if (!this.props.position) {
            this.state.overlay.setPosition(null);
            this.oldPositionX = NaN;
            this.oldPositionY = NaN;
            return;
        }
        if (this.props.position[0] === this.oldPositionX && this.props.position[1] === this.oldPositionY) {
            return;
        }
        if (!this.props.autoPan) {
            this.state.overlay.setPosition(this.props.position);
            return;
        }
        else {
            if (this.props.position) {
                this.state.overlay.setPosition([this.props.position[0], this.props.position[1] - 1]);
            }
            else {
                this.state.overlay.setPosition(null);
            }
            setTimeout(function () {
                if (_this.props.position) {
                    _this.state.overlay.setPosition(_this.props.position);
                }
            }, 800);
        }
        this.oldPositionX = this.props.position[0];
        this.oldPositionY = this.props.position[1];
    };
    Overlay.prototype.render = function () {
        var _this = this;
        var children = null;
        if (this.state.overlay != null) {
            children = this.props.children;
        }
        return (React.createElement("div", { style: { display: 'none' } },
            React.createElement("div", { ref: function (overlayDiv) {
                    _this.overlayDiv = overlayDiv;
                } },
                React.createElement("div", null, children))));
    };
    Overlay.defaultProps = {
        positioning: 'top-left',
        autoPan: false
    };
    Overlay.contextTypes = {
        /**
         * OpenLayers map.
         */
        olMap: Map_1.default
    };
    return Overlay;
}(React.Component));
exports.Overlay = Overlay;
//# sourceMappingURL=Overlay.js.map