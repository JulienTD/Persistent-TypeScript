"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Storage_1 = require("./Storage");
var JsonPlugin_1 = require("./plugin/JsonPlugin");
;
/**
 * Default persistent option. It uses json to load/save (json is not minified)
 */
function defaultOptions() {
    return {
        plugin: new JsonPlugin_1.JsonPlugin(false),
        path: ".persistent.json"
    };
}
/**
 * This decorator permits to tell the lib to save and load your class.
 * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
 */
function Persistent(options) {
    if (options === void 0) { options = defaultOptions(); }
    return function (target) {
        var original = target;
        /**
         * Create a class instance
         * @param constructor class' constructor
         * @param args args' constructor
         */
        function construct(constructor) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var c = function () {
                //@ts-ignore
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        // The new instance
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = construct(original, args);
            Storage_1.storage.store(instance, options);
            return instance;
        };
        f.prototype = original.prototype;
        return f;
    };
}
exports.Persistent = Persistent;
