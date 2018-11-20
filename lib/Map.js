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
var View_1 = require("ol/View");
// Map context
exports.mapContext = React.createContext({});
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
        // Stop event propagation from Popup
        _this.olMap.on('click', function (event) {
            var elem = event.originalEvent.target;
            if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
                event.stopPropagation();
            }
        });
        _this.olMap.on('singleclick', function (event) {
            var elem = event.originalEvent.target;
            if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
                event.stopPropagation();
            }
        });
        _this.olMap.on('dblclick', function (event) {
            var elem = event.originalEvent.target;
            if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
                event.stopPropagation();
            }
        });
        _this.olMap.on('pointerdrag', function (event) {
            var elem = event.originalEvent.target;
            if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
                event.stopPropagation();
            }
        });
        _this.olMap.on('wheel', function (event) {
            var elem = event.originalEvent.target;
            if (elem.nodeName !== 'CANVAS' && elem.className !== 'ol-unselectable') {
                event.stopPropagation();
            }
        });
        // Loading counter
        _this.olMap.set('loadingCounter', 0);
        _this.olMap.increaseLoadingCounter = _this.increaseLoadingCounter.bind(_this);
        _this.olMap.decreaseLoadingCounter = _this.decreaseLoadingCounter.bind(_this);
        return _this;
    }
    Map.prototype.componentDidMount = function () {
        this.olMap.setTarget(this.divMap);
    };
    Map.prototype.increaseLoadingCounter = function () {
        var c = this.olMap.get('loadingCounter');
        if (c <= 0) {
            this.olMap.set('loadingCounter', 1, true);
            this.olMap.dispatchEvent('loadstart');
        }
        else {
            this.olMap.set('loadingCounter', c + 1, true);
        }
    };
    Map.prototype.decreaseLoadingCounter = function () {
        var _this = this;
        var c = this.olMap.get('loadingCounter');
        if (c <= 1) {
            this.olMap.set('loadingCounter', 0, true);
            setTimeout(function () {
                if (_this.olMap.get('loadingCounter') === 0) {
                    _this.olMap.dispatchEvent('loadend');
                }
            }, 200);
        }
        else {
            this.olMap.set('loadingCounter', c - 1, true);
        }
    };
    Map.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.className },
            React.createElement("div", { ref: function (divMap) {
                    _this.divMap = divMap;
                }, className: this.props.className + "-olmap" }),
            React.createElement(exports.mapContext.Provider, { value: { olMap: this.olMap, olGroup: this.olMap.getLayerGroup() } }, this.props.children)));
    };
    Map.defaultProps = {
        className: 'map'
    };
    return Map;
}(React.Component));
exports.Map = Map;
//# sourceMappingURL=Map.js.map