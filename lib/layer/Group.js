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
var Group_1 = require("ol/layer/Group");
var BaseLayer_1 = require("./BaseLayer");
var MapContext_1 = require("../MapContext");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { readyGroup: false };
        return _this;
    }
    Group.prototype.createOlLayer = function () {
        this.setState({ readyGroup: true });
        return new Group_1.default();
    };
    Group.prototype.render = function () {
        if (!this.state.readyGroup) {
            return null;
        }
        return (React.createElement("div", null,
            React.createElement(MapContext_1.mapContext.Provider, { value: { olMap: this.context.olMap, olGroup: this.getOlLayer() } }, this.props.children)));
    };
    Group.contextType = MapContext_1.mapContext;
    return Group;
}(BaseLayer_1.BaseLayer));
exports.Group = Group;
//# sourceMappingURL=Group.js.map