import "reflect-metadata";
import { storage } from "./Storage";
import { IPersistentPlugin } from "./plugin/IPersistentPlugin";
import { JsonPlugin } from "./plugin/JsonPlugin";
import { Utils } from "./utils/Utils";

/**
 * Persistent options
 */
export interface IPersistentOptions {
    plugin: IPersistentPlugin;
    path: string;
    debug: boolean;
};

/**
 * Default persistent option. It uses json to load/save (json is not minified)
 */
function defaultOptions(): IPersistentOptions {
    return {
        plugin: new JsonPlugin(false),
        path: ".persistent.json",
        debug: false
    };
}

/**
 * This decorator permits to tell the lib to save and load your class.
 * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
 */
export function Persistent(options: IPersistentOptions = defaultOptions()) {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        var original = target;

        /**
         * Create a class instance
         * @param constructor class' constructor
         * @param args args' constructor
         */
        function construct(constructor: T, ...args: any[]) {
            var c : any = function() {
                //@ts-ignore
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        // The new instance
        var f : any = function (...args: any[]) {
            let instance = construct(original, args);
            let className: string | null = Utils.getClassName(instance);

            if (className != null) {
                let classLoaded = storage.getInstanceOfClass(className, options);

                if (classLoaded != null)
                    return classLoaded;
            }
            storage.store(instance, options);
            return instance;
        }
        f.prototype = original.prototype;
        return f;
    }
}