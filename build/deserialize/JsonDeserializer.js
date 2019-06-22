"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDeserializer = /** @class */ (function () {
    function JsonDeserializer() {
    }
    JsonDeserializer.prototype.deserialize = function (serializedObject) {
        return JSON.parse(serializedObject);
    };
    return JsonDeserializer;
}());
exports.JsonDeserializer = JsonDeserializer;
