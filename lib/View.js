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
var View_1 = require("ol/View");
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View.prototype.componentDidMount = function () {
        var view = new View_1.default({
            center: this.props.center,
            zoom: this.props.zoom,
            resolution: this.props.resolution,
            rotation: this.props.rotation,
            projection: this.props.olProjection
        });
        this.context.olMap.setView(view);
    };
    View.prototype.render = function () {
        return null;
    };
    View.contextTypes = {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.object
    };
    return View;
}(React.Component));
exports.View = View;
//# sourceMappingURL=View.js.map