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
var Group_1 = require("ol/layer/Group");
var Base_1 = require("ol/layer/Base");
var lodash_1 = require("lodash");
var utils_1 = require("../utils");
var globalOrder = 0;
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.olLayer = null;
        _this.handleLoadstart = function () {
            _this.context.olMap.increaseLoadingCounter();
        };
        _this.handleLoadend = function () {
            _this.context.olMap.decreaseLoadingCounter();
        };
        _this.handleLoaderror = function () {
            _this.context.olMap.decreaseLoadingCounter();
        };
        _this.handleBaseLayerPropertychange = function (event) {
            var key = event.key;
            var value = event.target.get(key);
            var obj = _this;
            if (key !== 'zIndex') {
                obj[key] = value;
            }
            if (key === 'visible') {
                if (value === true && _this.type === 'BASE') {
                    utils_1.walk(_this.context.olMap, function (currentOlLayer) {
                        if (currentOlLayer.get('type') === 'BASE' && currentOlLayer !== _this.olLayer) {
                            currentOlLayer.setVisible(false);
                        }
                        return true;
                    });
                }
            }
        };
        return _this;
    }
    Base.prototype.componentWillMount = function () {
        this.olLayer = this.createOlLayer();
        this.checkProps(this.props);
    };
    Base.prototype.componentDidMount = function () {
        // Add OlLayer to map
        if (this.type === 'BASE') {
            this.context.olMap.addLayer(this.olLayer);
        }
        else {
            this.context.olGroup.getLayers().push(this.olLayer);
        }
        // Activate events
        this.internalAddEvents();
    };
    Base.prototype.shouldComponentUpdate = function (nextProps) {
        // Optimisation: check if props are changed
        if (lodash_1.isEqual(nextProps, this.props)) {
            return false;
        }
        return true;
    };
    Base.prototype.componentWillUpdate = function (nextProps) {
        this.checkProps(nextProps);
    };
    Base.prototype.componentWillUnmount = function () {
        var _this = this;
        // Remove events
        this.internalRemoveEvents();
        // Remove OlLayer to map
        utils_1.walk(this.context.olMap, function (currentOlLayer, idx, parent) {
            if (currentOlLayer === _this.olLayer) {
                parent.getLayers().remove(_this.olLayer);
            }
            return true;
        });
        this.context.olMap.removeLayer(this.olLayer);
    };
    Base.prototype.createOlLayer = function () {
        return new Base_1.default({});
    };
    Base.prototype.checkProps = function (props) {
        this.setId(props.id);
        this.setName(props.name);
        this.setData(props.data);
        this.setType(props.type);
        this.setVisible(props.visible);
        this.setOpacity(props.opacity);
        this.setExtent(props.extent);
        this.setOrder(props.order);
    };
    Base.prototype.internalRemoveEvents = function () {
        // Unwatch events on layer
        this.olLayer.un('propertychange', this.handleBaseLayerPropertychange);
        this.olLayer.un('precompose', this.handleLoadstart);
        this.olLayer.un('postcompose', this.handleLoadend);
        if ('getSource' in this.olLayer && this.olLayer.getSource()) {
            // Unwatch events on source
            this.olLayer.getSource().un('tileloadstart', this.handleLoadstart);
            this.olLayer.getSource().un('tileloadend', this.handleLoadend);
            this.olLayer.getSource().un('tileloaderror', this.handleLoaderror);
            this.olLayer.getSource().un('imageloadstart', this.handleLoadstart);
            this.olLayer.getSource().un('imageloadend', this.handleLoadend);
            this.olLayer.getSource().un('imageloaderror', this.handleLoaderror);
        }
    };
    Base.prototype.internalAddEvents = function () {
        // Watch events on layer
        this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
        this.olLayer.on('precompose', this.handleLoadstart);
        this.olLayer.on('postcompose', this.handleLoadend);
        if ('getSource' in this.olLayer && this.olLayer.getSource()) {
            // Watch events on source
            this.olLayer.getSource().on('tileloadstart', this.handleLoadstart);
            this.olLayer.getSource().on('tileloadend', this.handleLoadend);
            this.olLayer.getSource().on('tileloaderror', this.handleLoaderror);
            this.olLayer.getSource().on('imageloadstart', this.handleLoadstart);
            this.olLayer.getSource().on('imageloadend', this.handleLoadend);
            this.olLayer.getSource().on('imageloaderror', this.handleLoaderror);
        }
    };
    Base.prototype.getOlLayer = function () {
        return this.olLayer;
    };
    Base.prototype.getOlSource = function () {
        if ('getSource' in this.olLayer) {
            return this.olLayer.getSource();
        }
        return null;
    };
    Base.prototype.setOlSource = function (olSource) {
        if ('getSource' in this.olLayer) {
            return this.olLayer.setSource(olSource);
        }
    };
    Base.prototype.setId = function (id) {
        this.id = id;
        this.olLayer.set('id', this.id);
    };
    Base.prototype.setName = function (name) {
        this.name = name;
        this.olLayer.set('name', this.name);
    };
    Base.prototype.setData = function (data) {
        this.data = data;
        this.olLayer.set('data', this.data);
    };
    Base.prototype.setType = function (type) {
        this.type = type;
        if (this.type == null || (this.type !== 'BASE' && this.type !== 'OVERLAY')) {
            this.type = 'OVERLAY';
        }
        this.olLayer.set('type', this.type);
    };
    Base.prototype.setOrder = function (order) {
        this.order = null;
        if (lodash_1.isInteger(order)) {
            this.order = order;
        }
        if (this.order == null || this.order < 0) {
            this.order = globalOrder + 1;
        }
        if (this.order > globalOrder) {
            globalOrder = this.order;
        }
        this.zIndex = this.order;
        if (this.type === 'OVERLAY') {
            this.zIndex += 10000;
        }
        this.olLayer.set('order', this.order);
        this.olLayer.setZIndex(this.zIndex);
    };
    Base.prototype.setOpacity = function (opacity) {
        this.opacity = null;
        if (lodash_1.isFinite(opacity)) {
            this.opacity = opacity;
        }
        if (this.opacity == null || (this.opacity < 0 && this.opacity > 1)) {
            this.opacity = 1;
        }
        this.olLayer.setOpacity(this.opacity);
    };
    Base.prototype.setVisible = function (visible) {
        this.visible = null;
        if (lodash_1.isBoolean(visible)) {
            this.visible = visible;
        }
        if (this.visible == null) {
            this.visible = true;
        }
        this.olLayer.setVisible(this.visible);
    };
    Base.prototype.setExtent = function (extent) {
        this.extent = extent;
        if (this.extent == null) {
            this.extent = undefined;
        }
        this.olLayer.setExtent(this.extent);
    };
    Base.prototype.render = function () {
        return null;
    };
    Base.contextTypes = {
        /**
         * OpenLayers map.
         */
        olMap: Map_1.default,
        /**
         * OpenLayers group.
         */
        olGroup: Group_1.default
    };
    return Base;
}(React.Component));
exports.Base = Base;
//# sourceMappingURL=Base.js.map