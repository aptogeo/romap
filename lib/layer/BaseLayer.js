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
var lodash_1 = require("lodash");
var utils_1 = require("../utils");
var MapContext_1 = require("../MapContext");
var globalOrder = 0;
var BaseLayer = /** @class */ (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.olLayer = null;
        _this.handleBaseLayerPropertychange = function (event) {
            var key = event.key;
            var value = event.target.get(key);
            if (key === 'visible' && value === true && _this.props.type === 'BASE') {
                utils_1.walk(_this.context.olMap, function (currentOlLayer) {
                    if (currentOlLayer.get('type') === 'BASE' && currentOlLayer !== _this.olLayer) {
                        currentOlLayer.setVisible(false);
                    }
                    return true;
                });
            }
        };
        return _this;
    }
    BaseLayer.prototype.componentDidMount = function () {
        this.olLayer = this.createOlLayer();
        this.updateProps({}, this.props);
        // Add OlLayer to map
        if (this.props.type === 'BASE') {
            this.context.olMap.addLayer(this.olLayer);
        }
        else {
            this.context.olGroup.getLayers().push(this.olLayer);
        }
        // Activate events
        this.internalAddEvents();
    };
    BaseLayer.prototype.componentDidUpdate = function (prevProps) {
        this.updateProps(prevProps, this.props);
    };
    BaseLayer.prototype.componentWillUnmount = function () {
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
    BaseLayer.prototype.createOlLayer = function () {
        return null;
    };
    BaseLayer.prototype.updateProps = function (prevProps, nextProps) {
        if (prevProps.id !== nextProps.id) {
            this.setId(nextProps.id);
        }
        if (prevProps.name !== nextProps.name) {
            this.setName(nextProps.name);
        }
        if (prevProps.type !== nextProps.type) {
            this.setType(nextProps.type);
        }
        if (prevProps.visible !== nextProps.visible) {
            this.setVisible(nextProps.visible);
        }
        if (prevProps.opacity !== nextProps.opacity) {
            this.setOpacity(nextProps.opacity);
        }
        if (!lodash_1.isEqual(prevProps.extent, nextProps.extent)) {
            this.setExtent(nextProps.extent);
        }
        if (prevProps.order !== nextProps.order || prevProps.type !== nextProps.type) {
            this.setOrder(nextProps.order, nextProps.type);
        }
        this.setProps(nextProps);
    };
    BaseLayer.prototype.internalRemoveEvents = function () {
        // Unwatch events on layer
        this.olLayer.un('propertychange', this.handleBaseLayerPropertychange);
    };
    BaseLayer.prototype.internalAddEvents = function () {
        // Watch events on layer
        this.olLayer.on('propertychange', this.handleBaseLayerPropertychange);
    };
    BaseLayer.prototype.getOlLayer = function () {
        return this.olLayer;
    };
    BaseLayer.prototype.getOlSource = function () {
        if ('getSource' in this.olLayer) {
            return this.olLayer.getSource();
        }
        return null;
    };
    BaseLayer.prototype.setOlSource = function (olSource) {
        if ('setSource' in this.olLayer) {
            return this.olLayer.setSource(olSource);
        }
    };
    BaseLayer.prototype.setId = function (id) {
        this.olLayer.set('id', id);
    };
    BaseLayer.prototype.setName = function (name) {
        this.olLayer.set('name', name);
    };
    BaseLayer.prototype.setType = function (type) {
        if (type == null || (type !== 'BASE' && type !== 'OVERLAY')) {
            type = 'OVERLAY';
        }
        this.olLayer.set('type', type);
    };
    BaseLayer.prototype.setOrder = function (order, type) {
        order = +order;
        if (order == null || order < 0) {
            order = globalOrder + 1;
        }
        if (order > globalOrder) {
            globalOrder = order;
        }
        var zIndex = order;
        if (type === 'OVERLAY') {
            zIndex += 10000;
        }
        this.olLayer.set('order', order);
        this.olLayer.setZIndex(zIndex);
    };
    BaseLayer.prototype.setOpacity = function (opacity) {
        if (opacity !== +opacity) {
            opacity = 1;
        }
        if (opacity < 0 && opacity > 1) {
            opacity = 1;
        }
        this.olLayer.setOpacity(opacity);
    };
    BaseLayer.prototype.setVisible = function (visible) {
        if (visible !== false) {
            visible = true;
        }
        this.olLayer.setVisible(visible);
    };
    BaseLayer.prototype.setExtent = function (extent) {
        if (extent == null) {
            extent = undefined;
        }
        this.olLayer.setExtent(extent);
    };
    BaseLayer.prototype.setProps = function (props) {
        this.olLayer.set('props', props, false);
    };
    BaseLayer.prototype.render = function () {
        return null;
    };
    BaseLayer.contextType = MapContext_1.mapContext;
    return BaseLayer;
}(React.Component));
exports.BaseLayer = BaseLayer;
//# sourceMappingURL=BaseLayer.js.map