(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**
         * Retrieves the class name from a class instance
         * @param instance class instance
         */
        Utils.getClassName = function (instance) {
            return instance.constructor ? instance.constructor.name : null;
        };
        /**
         * Checks if the library is running on the browser
         */
        Utils.isBrowser = function () {
            return typeof window !== 'undefined' && typeof window.document !== 'undefined';
        };
        return Utils;
    }());
    exports.Utils = Utils;
    ;
});