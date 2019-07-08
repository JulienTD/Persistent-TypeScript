"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map_1 = require("../utils/Map");
var JsonPlugin = /** @class */ (function () {
    function JsonPlugin(isMinified) {
        this.minified = isMinified;
    }
    JsonPlugin.prototype.init = function () {
        return new Map_1.Map();
    };
    JsonPlugin.prototype.serialize = function (object) {
        return object.toJson(this.minified);
    };
    JsonPlugin.prototype.deserialize = function (serializedObject) {
        return Map_1.Map.fromJson(serializedObject);
    };
    JsonPlugin.prototype.get = function (object, className) {
        if (object == null)
            return null;
        return object.getValue(className);
    };
    JsonPlugin.prototype.put = function (object, className, classInstance) {
        object.put(className, classInstance);
    };
    return JsonPlugin;
}());
exports.JsonPlugin = JsonPlugin;
;
