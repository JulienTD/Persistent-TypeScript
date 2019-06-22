"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var HashMap_1 = require("./HashMap");
var fs = require("fs");
var process = require("process");
var Storage = /** @class */ (function () {
    function Storage() {
        this.persistentObjects = null;
        var This = this;
        this.loadPersistentFile(".persistent.json");
        if (this.persistentObjects == null)
            this.persistentObjects = new HashMap_1.HashMap();
        process.on('exit', function (code) {
            return This.save();
        });
        console.log("[Persistent] Initialization done !");
    }
    Storage.prototype.loadPersistentFile = function (filePath /*, options: IPersistentOptions*/) {
        try {
            var data = fs.readFileSync(filePath, "utf8");
            if (data == null || data === undefined)
                return;
            this.persistentObjects = HashMap_1.HashMap.fromJson(data); // options.deserializer.deserialize(data);// HashMap.fromJson(data); // Deserialization
        }
        catch (err) {
        }
    };
    Storage.prototype.store = function (classInstance, options) {
        var className = Utils_1.Utils.getClassName(classInstance);
        var savedClass = this.persistentObjects.getValue(className);
        if (savedClass != null) {
            for (var field in savedClass) {
                classInstance[field] = savedClass[field];
            }
        }
        this.persistentObjects.put(className, classInstance);
    };
    Storage.prototype.save = function () {
        console.log("[Persistent] Saving classes ...");
        fs.writeFileSync('.persistent.json', this.persistentObjects.toJson()); // Serialization
        console.log("[Persistent] Done !");
    };
    return Storage;
}());
exports.Storage = Storage;
;
if (exports.storage == null || exports.storage === null)
    exports.storage = new Storage();
