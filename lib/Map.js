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
var Map_1 = require("ol/Map");
var View_1 = require("ol/View");
var MapContext_1 = require("./MapContext");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.olMap = new Map_1.default({
            controls: [],
            keyboardEventTarget: props.keyboardEventTarget
        });
        _this.olView = new View_1.default({
            center: [0, 0],
            zoom: 2
        });
        _this.olMap.setView(_this.olView);
        _this.stopPropagationForComponents();
        return _this;
    }
    Map.prototype.componentDidMount = function () {
        this.olMap.setTarget(this.divMap);
    };
    Map.prototype.stopPropagationForComponents = function () {
        // Stop event propagation for components
        this.olMap.on('click', this.stopEventPropagation);
        this.olMap.on('singleclick', this.stopEventPropagation);
        this.olMap.on('dblclick', this.stopEventPropagation);
        this.olMap.on('pointerdrag', this.stopEventPropagation);
        this.olMap.on('wheel', this.stopEventPropagation);
    };
    Map.prototype.stopEventPropagation = function (event) {
        if (event == null || event.originalEvent == null || event.originalEvent.target == null) {
            return;
        }
        var elem = event.originalEvent.target;
        if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
            event.stopPropagation();
        }
    };
    Map.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.className },
            React.createElement("div", { ref: function (divMap) {
                    _this.divMap = divMap;
                }, className: this.props.className + "-olmap" }),
            React.createElement(MapContext_1.mapContext.Provider, { value: {
                    olMap: this.olMap,
                    olGroup: this.olMap.getLayerGroup()
                } }, this.props.children)));
    };
    Map.defaultProps = {
        className: 'map'
    };
    return Map;
}(React.Component));
exports.Map = Map;
//# sourceMappingURL=Map.js.map