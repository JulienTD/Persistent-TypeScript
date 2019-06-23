import "reflect-metadata";
import { storage } from "./Storage";
import { JsonSerializer } from "./serializer/JsonSerializer";
import { JsonDeserializer } from "./deserializer/JsonDeserializer";
import { IPersistentSerializer } from "./serializer/IPersistentSerializer";
import { IPersistentDeserializer } from "./deserializer/IPersistentDeserializer";
import { IPersistentPlugin } from "./plugin/PersistentPlugin";
import { JsonPlugin } from "./plugin/JsonPlugin";

export interface IPersistentOptions {
    plugin: IPersistentPlugin;
    path: string;
};

function defaultOptions(): IPersistentOptions {
    return {
        plugin: new JsonPlugin(),
        path: ".persistent.json"};
}

/**
 * Decorator
 */
export function Persistent(options: IPersistentOptions = defaultOptions()) {
    return function <T extends { new(...args: any[]): {} }>(target: any) { // should be target: T
        var original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            var c : any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        // the new constructor behaviour
        var f : any = function (...args) {
            let instance = construct(original, args);
            storage.store(instance, options);
            return instance;
        }

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        return f;
    }
}