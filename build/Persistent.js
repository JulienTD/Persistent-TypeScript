"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Storage_1 = require("./Storage");
var JsonPlugin_1 = require("./plugin/JsonPlugin");
;
function defaultOptions() {
    return {
        plugin: new JsonPlugin_1.JsonPlugin(),
        path: ".persistent.json"
    };
}
/**
 * Decorator
 */
function Persistent(options) {
    if (options === void 0) { options = defaultOptions(); }
    return function (target) {
        var original = target;
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            var c = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        // the new constructor behaviour
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = construct(original, args);
            Storage_1.storage.store(instance, options);
            return instance;
        };
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        return f;
    };
}
exports.Persistent = Persistent;
