"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap_1 = require("../HashMap");
var JsonPlugin = /** @class */ (function () {
    function JsonPlugin() {
    }
    JsonPlugin.prototype.init = function () {
        return new HashMap_1.HashMap();
    };
    JsonPlugin.prototype.serialize = function (object) {
        return object.toJson();
    };
    JsonPlugin.prototype.deserialize = function (serializedObject) {
        return HashMap_1.HashMap.fromJson(serializedObject);
    };
    JsonPlugin.prototype.get = function (object, className) {
        if (object == null)
            return null;
        return object.getValue(className);
    };
    JsonPlugin.prototype.put = function (object, className, classInstance) {
        object.put(className, classInstance);
        // this.persistentObjects.getValue(options.path).put(className, classInstance);
    };
    return JsonPlugin;
}());
exports.JsonPlugin = JsonPlugin;
;
