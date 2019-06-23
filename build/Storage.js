"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var HashMap_1 = require("./HashMap");
var fs = require("fs");
var process = require("process");
var path = require("path");
var Storage = /** @class */ (function () {
    function Storage() {
        this.persistentObjects = null;
        this.persistentObjectsMetadata = null;
        var This = this;
        this.persistentObjects = new HashMap_1.HashMap();
        this.persistentObjectsMetadata = new HashMap_1.HashMap();
        process.on('exit', function (code) {
            return This.save();
        });
        console.log("[Persistent] Initialization done !");
    }
    Storage.prototype.loadPersistentFile = function (options) {
        try {
            if (this.persistentObjects.containsKey(path.resolve(options.path)) == true)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.init());
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
            var data = fs.readFileSync(path.resolve(options.path), "utf8");
            if (data == null || data === undefined)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.deserialize(data));
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
        }
        catch (err) {
        }
    };
    Storage.prototype.store = function (classInstance, options) {
        this.loadPersistentFile(options);
        var className = Utils_1.Utils.getClassName(classInstance);
        var savedClass = options.plugin.get(this.persistentObjects.getValue(path.resolve(options.path)), className);
        if (savedClass != null) {
            for (var field in savedClass) {
                classInstance[field] = savedClass[field];
            }
        }
        options.plugin.put(this.persistentObjects.getValue(path.resolve(options.path)), className, classInstance);
    };
    Storage.prototype.save = function () {
        console.log("[Persistent] Saving classes ...");
        for (var _i = 0, _a = this.persistentObjects.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            fs.writeFileSync(key, this.persistentObjectsMetadata.getValue(key).plugin.serialize(this.persistentObjects.getValue(key)));
        }
        console.log("[Persistent] Done !");
    };
    return Storage;
}());
exports.Storage = Storage;
;
if (exports.storage == null || exports.storage === null)
    exports.storage = new Storage();
