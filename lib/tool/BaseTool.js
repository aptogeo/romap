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
var BaseTool = /** @class */ (function (_super) {
    __extends(BaseTool, _super);
    function BaseTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTool.prototype.getChildren = function () {
        var _this = this;
        var children = [];
        if (this.props.children) {
            React.Children.map(this.props.children, function (child, index) {
                React.cloneElement(child, { active: _this.props.active, disable: _this.props.disable });
                children.push(child);
            });
        }
        return children;
    };
    return BaseTool;
}(React.Component));
exports.BaseTool = BaseTool;
//# sourceMappingURL=BaseTool.js.map