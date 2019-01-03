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
var MapContext_1 = require("../MapContext");
var BaseTool_1 = require("./BaseTool");
var MapResizer = /** @class */ (function (_super) {
    __extends(MapResizer, _super);
    function MapResizer(props) {
        var _this = _super.call(this, props) || this;
        _this.updateSize = function () {
            var olMap = _this.context.olMap;
            var targetElement = olMap.getTargetElement();
            if (targetElement) {
                var w = targetElement.parentElement.offsetWidth;
                var h = targetElement.parentElement.offsetHeight;
                targetElement.style.width = w + "px";
                targetElement.style.height = h + "px";
                olMap.setSize([w, h]);
            }
        };
        if (_this.props.disable === true) {
            window.removeEventListener('resize', _this.updateSize);
        }
        else {
            window.addEventListener('resize', _this.updateSize);
        }
        return _this;
    }
    MapResizer.prototype.render = function () {
        return null;
    };
    MapResizer.contextType = MapContext_1.mapContext;
    return MapResizer;
}(BaseTool_1.BaseTool));
exports.MapResizer = MapResizer;
//# sourceMappingURL=MapResizer.js.map