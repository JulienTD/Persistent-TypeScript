(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils/Utils", "./utils/Map", "fs", "process", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils_1 = require("./utils/Utils");
    var Map_1 = require("./utils/Map");
    var fs = require("fs");
    var process = require("process");
    var path = require("path");
    var Storage = /** @class */ (function () {
        function Storage() {
            var This = this;
            this.persistentObjects = new Map_1.Map();
            this.persistentObjectsMetadata = new Map_1.Map();
            if (Utils_1.Utils.isBrowser()) {
                window.addEventListener("unload", function (event) {
                    This.save();
                });
            }
            else {
                process.on('SIGINT', function () {
                    This.save();
                });
                process.on('SIGHUP', function () {
                    This.save();
                });
                process.on('SIGQUIT', function () {
                    This.save();
                });
                process.on('SIGTERM', function () {
                    This.save();
                });
                process.on('uncaughtException', function () {
                    This.save();
                });
                process.on('exit', function () {
                    This.save();
                });
            }
            console.log("[Persistent] Initialization done !");
        }
        /**
         * Loads a persistent file to retrieve the classes information stored in it
         * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
         * @param force Force to reload the file
         */
        Storage.prototype.loadPersistentFile = function (options, force) {
            try {
                if (this.persistentObjects.containsKey(path.resolve(options.path)) == true && !force)
                    return;
                this.persistentObjects.put(path.resolve(options.path), options.plugin.init());
                this.persistentObjectsMetadata.put(path.resolve(options.path), options);
                var data = null;
                if (Utils_1.Utils.isBrowser()) {
                    data = localStorage.getItem(path.resolve(options.path));
                }
                else {
                    data = fs.readFileSync(path.resolve(options.path), "utf8");
                }
                if (data == null || data === undefined)
                    return;
                this.persistentObjects.put(path.resolve(options.path), options.plugin.deserialize(data));
                this.persistentObjectsMetadata.put(path.resolve(options.path), options);
            }
            catch (err) {
            }
        };
        /**
         * Stores the class instance to the storage
         * @param classInstance class instance to store
         * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
         */
        Storage.prototype.store = function (classInstance, options) {
            this.loadPersistentFile(options, false);
            var className = Utils_1.Utils.getClassName(classInstance);
            if (className == null)
                return;
            var savedClass = options.plugin.get(this.persistentObjects.getValue(path.resolve(options.path)), className);
            if (savedClass != null) {
                for (var field in savedClass) {
                    classInstance[field] = savedClass[field];
                }
            }
            options.plugin.put(this.persistentObjects.getValue(path.resolve(options.path)), className, classInstance);
        };
        /**
         * Saves all classes stored in the storage using the plugin specified
         */
        Storage.prototype.save = function () {
            console.log("[Persistent] Saving classes ...");
            for (var _i = 0, _a = this.persistentObjects.keys(); _i < _a.length; _i++) {
                var key = _a[_i];
                if (Utils_1.Utils.isBrowser()) {
                    localStorage.setItem(key, this.persistentObjectsMetadata.getValue(key).plugin.serialize(this.persistentObjects.getValue(key)));
                }
                else {
                    fs.writeFileSync(key, this.persistentObjectsMetadata.getValue(key).plugin.serialize(this.persistentObjects.getValue(key)));
                }
            }
            console.log("[Persistent] Done !");
        };
        return Storage;
    }());
    exports.Storage = Storage;
    ;
    //@ts-ignore
    if (exports.storage == undefined) {
        exports.storage = new Storage();
    }
});
