"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonSerializer = /** @class */ (function () {
    function JsonSerializer() {
    }
    JsonSerializer.prototype.serialize = function (object) {
        return JSON.stringify(object);
    };
    return JsonSerializer;
}());
exports.JsonSerializer = JsonSerializer;
