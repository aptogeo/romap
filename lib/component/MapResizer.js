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
var MapResizer = /** @class */ (function (_super) {
    __extends(MapResizer, _super);
    function MapResizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapResizer.prototype.componentWillMount = function () {
        window.addEventListener('resize', this.updateSize.bind(this));
    };
    MapResizer.prototype.updateSize = function () {
        var olMap = this.context.olMap;
        var targetElement = olMap.getTargetElement();
        if (targetElement) {
            var w = targetElement.parentElement.offsetWidth;
            var h = targetElement.parentElement.offsetHeight;
            targetElement.style.width = w + "px";
            targetElement.style.height = h + "px";
            olMap.setSize([w, h]);
        }
    };
    MapResizer.prototype.render = function () {
        return null;
    };
    MapResizer.contextTypes = {
        /**
         * OpenLayers map.
         */
        olMap: PropTypes.object
    };
    return MapResizer;
}(React.Component));
exports.MapResizer = MapResizer;
//# sourceMappingURL=MapResizer.js.map