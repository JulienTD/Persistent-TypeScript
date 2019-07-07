define("utils/Utils", ["require", "exports"], function (require, exports) {
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
        Utils.isBrowser = function () {
            return typeof window !== 'undefined' && typeof window.document !== 'undefined';
        };
        return Utils;
    }());
    exports.Utils = Utils;
    ;
});
define("utils/Map", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Map = /** @class */ (function () {
        function Map() {
            this.map = {};
            this.mapSize = 0;
        }
        /**
         *  Puts a key and its value in the map
         * @param {string} key
         * @param {any} value
         */
        Map.prototype.put = function (key, value) {
            if (!this.containsKey(key)) {
                this.mapSize++;
            }
            this.map[key] = value;
            return true;
        };
        /**
         *  Clears the map
         */
        Map.prototype.clear = function () {
            this.mapSize = 0;
            this.map = {};
            return true;
        };
        /**
         *  Returns an array of all the keys stored in the map
         */
        Map.prototype.keys = function () {
            var keys = [];
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
        /**
         *  Returns an array of all the values stored in the map
         */
        Map.prototype.values = function () {
            var values = [];
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    values.push(this.map[key]);
                }
            }
            return values;
        };
        /**
         *  Checks if the map is empty or not
         */
        Map.prototype.isEmpty = function () {
            return this.mapSize === 0;
        };
        /**
         *  Removes a key and its value from the map
         * @param {string} key
         * @return returns the stored value if not it returns null
         */
        Map.prototype.removeKey = function (key) {
            if (this.containsKey(key)) {
                this.mapSize--;
                var value = this.map[key];
                delete this.map[key];
                return value;
            }
            return null;
        };
        /**
         *  Checks if the map is containing the specified key
         * @param {string} key
         */
        Map.prototype.containsKey = function (key) {
            return this.map.hasOwnProperty(key);
        };
        /**
         *  Checks if the map is containing the specified value
         * @param {any} value
         */
        Map.prototype.containsValue = function (value) {
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    if (this.map[key] === value) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         *  Returns the size of the map
         */
        Map.prototype.size = function () {
            return this.mapSize;
        };
        /**
         *  Returns the value associated to the specified key
         * @param {string} key
         * @return returns the value associated if not it returns null
         */
        Map.prototype.getValue = function (key) {
            if (this.containsKey(key)) {
                return this.map[key];
            }
            return null;
        };
        /**
         *  Saves the map to json
         */
        Map.prototype.toJson = function (isMinified) {
            if (!isMinified)
                return JSON.stringify(this.map, null, 4);
            else
                return JSON.stringify(this.map);
        };
        /**
         *  Creates an map from its serialization
         * @param data serialized map
         */
        Map.fromJson = function (serializedHm) {
            var hm = new Map();
            var rawObject = JSON.parse(serializedHm);
            if (rawObject == null)
                return null;
            for (var key in rawObject) {
                hm.put(key, rawObject[key]);
            }
            return hm;
        };
        return Map;
    }());
    exports.Map = Map;
});
define("Storage", ["require", "exports", "utils/Utils", "utils/Map", "fs", "process", "path"], function (require, exports, Utils_1, Map_1, fs, process, path) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Storage = /** @class */ (function () {
        function Storage() {
            this.persistentObjects = null;
            this.persistentObjectsMetadata = null;
            var This = this;
            this.persistentObjects = new Map_1.Map();
            this.persistentObjectsMetadata = new Map_1.Map();
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
    if (exports.storage == null || exports.storage === null)
        exports.storage = new Storage();
});
define("plugin/IPersistentPlugin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("plugin/JsonPlugin", ["require", "exports", "utils/Map"], function (require, exports, Map_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonPlugin = /** @class */ (function () {
        function JsonPlugin(isMinified) {
            this.minified = isMinified;
        }
        JsonPlugin.prototype.init = function () {
            return new Map_2.Map();
        };
        JsonPlugin.prototype.serialize = function (object) {
            return object.toJson(this.minified);
        };
        JsonPlugin.prototype.deserialize = function (serializedObject) {
            return Map_2.Map.fromJson(serializedObject);
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
});
define("Persistent", ["require", "exports", "Storage", "plugin/JsonPlugin", "reflect-metadata"], function (require, exports, Storage_1, JsonPlugin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
