"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestPlugin = /** @class */ (function () {
    function TestPlugin() {
    }
    TestPlugin.prototype.init = function () {
        return {};
    };
    TestPlugin.prototype.serialize = function (object) {
        return "Hello=" + object["instance"]["value"];
    };
    TestPlugin.prototype.deserialize = function (serializedObject) {
        return { instance: { value: serializedObject.split("=")[1] } };
    };
    TestPlugin.prototype.get = function (object, className) {
        if (object == null)
            return null;
        return object["instance"];
    };
    TestPlugin.prototype.put = function (object, className, classInstance) {
        object["instance"] = classInstance;
    };
    return TestPlugin;
}());
exports.TestPlugin = TestPlugin;
;
