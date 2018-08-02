"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("ol/View");
/**
 * Walk recursivly.
 * @param  {OlMap | LayerGroup} map or group
 * @param  {Function} fn callback function
 */
function walk(top, fn) {
    var group = 'getLayerGroup' in top ? top.getLayerGroup() : top;
    if (group && 'getLayers' in group) {
        group.getLayers().forEach(function (layer, idx) {
            if (layer) {
                var cont = fn(layer, idx, group);
                if (cont !== false && 'getLayers' in layer) {
                    walk(layer, fn);
                }
            }
        });
    }
}
exports.walk = walk;
/**
 * Clone view.
 * @param {OlView} view
 */
function cloneView(view) {
    var center = view.getCenter();
    var newCenter = [center[0], center[1]];
    return new View_1.default({
        center: newCenter,
        zoom: view.getZoom(),
        resolution: view.getResolution(),
        rotation: view.getRotation(),
        projection: view.getProjection(),
        maxResolution: view.getMaxResolution(),
        minResolution: view.getMinResolution(),
        maxZoom: view.getMaxZoom(),
        minZoom: view.getMinZoom(),
        resolutions: view.getResolutions()
    });
}
exports.cloneView = cloneView;
//# sourceMappingURL=utils.js.map