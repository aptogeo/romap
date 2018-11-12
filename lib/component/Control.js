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
var Control_1 = require("ol/control/Control");
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            control: null
        };
        return _this;
    }
    Control.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Control.prototype.componentDidUpdate = function () {
        if (this.controlDiv != null && this.state.control == null) {
            this.createControl();
        }
    };
    Control.prototype.componentWillUnmount = function () {
        this.context.olMap.removeControl(this.state.control);
    };
    Control.prototype.createControl = function () {
        var control = new Control_1.default({
            element: this.controlDiv.children[0],
            target: this.context.olMap.getOverlayContainer()
        });
        this.context.olMap.addControl(control);
        this.setState({
            control: control
        });
    };
    Control.prototype.render = function () {
        var _this = this;
        var children = null;
        if (this.state.control != null) {
            children = this.props.children;
        }
        return (React.createElement("div", { style: { display: 'none' } },
            React.createElement("div", { ref: function (controlDiv) {
                    _this.controlDiv = controlDiv;
                } },
                React.createElement("div", null, children))));
    };
    Control.contextTypes = {
        olMap: function () { return null; },
        olGroup: function () { return null; }
    };
    return Control;
}(React.Component));
exports.Control = Control;
//# sourceMappingURL=Control.js.map