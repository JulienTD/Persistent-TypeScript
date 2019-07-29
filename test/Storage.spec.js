"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Storage_1 = require("../build/Storage");
var JsonPlugin_1 = require("../build/plugin/JsonPlugin");
var mocha_1 = require("mocha");
var Test = /** @class */ (function () {
    function Test(text) {
        this.a = text;
    }
    return Test;
}());
mocha_1.describe('Storage', function () {
    mocha_1.it('should store class instance', function () {
        var instance = new Test("storage spec");
        Storage_1.storage.store(instance, { path: "./storage_spec.txt", plugin: new JsonPlugin_1.JsonPlugin(false), debug: false });
        chai_1.expect(Storage_1.storage.getSize()).to.equal(1);
    });
});
