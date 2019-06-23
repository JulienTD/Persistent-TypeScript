"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap = /** @class */ (function () {
    function HashMap() {
        this.map = {};
        this.mapSize = 0;
    }
    /**
     *  Puts a key and its value in the map
     * @param {string} key
     * @param {any} value
     */
    HashMap.prototype.put = function (key, value) {
        if (!this.containsKey(key)) {
            this.mapSize++;
        }
        this.map[key] = value;
        return true;
    };
    /**
     *  Clears the map
     */
    HashMap.prototype.clear = function () {
        this.mapSize = 0;
        this.map = {};
        return true;
    };
    /**
     *  Returns an array of all the keys stored in the map
     */
    HashMap.prototype.keys = function () {
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
    HashMap.prototype.values = function () {
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
    HashMap.prototype.isEmpty = function () {
        return this.mapSize === 0;
    };
    /**
     *  Removes a key and its value from the map
     * @param {string} key
     * @return returns the stored value if not it returns null
     */
    HashMap.prototype.removeKey = function (key) {
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
    HashMap.prototype.containsKey = function (key) {
        return this.map.hasOwnProperty(key);
    };
    /**
     *  Checks if the map is containing the specified value
     * @param {any} value
     */
    HashMap.prototype.containsValue = function (value) {
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
    HashMap.prototype.size = function () {
        return this.mapSize;
    };
    /**
     *  Returns the value associated to the specified key
     * @param {string} key
     * @return returns the value associated if not it returns null
     */
    HashMap.prototype.getValue = function (key) {
        if (this.containsKey(key)) {
            return this.map[key];
        }
        return null;
    };
    /**
     *  Saves the hashmap to json
     */
    HashMap.prototype.toJson = function () {
        return JSON.stringify(this.map);
    };
    /**
     *  Creates an hashmap from its serialization
     * @param data serialized hashmap
     */
    HashMap.fromJson = function (serializedHm) {
        var hm = new HashMap();
        var rawObject = JSON.parse(serializedHm);
        if (rawObject == null)
            return null;
        for (var key in rawObject) {
            hm.put(key, rawObject[key]);
        }
        return hm;
    };
    return HashMap;
}());
exports.HashMap = HashMap;
