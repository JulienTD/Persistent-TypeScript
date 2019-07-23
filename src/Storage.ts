import { Utils } from "./utils/Utils";
import { Map } from "./utils/Map";
import { Persistent, IPersistentOptions } from "./Persistent";
import * as fs from 'fs';
import * as process from "process";
import * as path from "path";

export class Storage {
    private persistentObjects: Map;
    private persistentObjectsMetadata: Map;

    constructor() {
        let This = this;
        this.persistentObjects = new Map();
        this.persistentObjectsMetadata = new Map();
        if (Utils.isBrowser()) {
            window.addEventListener("unload", function(event) {
                This.save();
            });
        } else {
            process.on('SIGINT', function() {
                This.save();
            });
            process.on('SIGHUP', function() {
                This.save();
            });
            process.on('SIGQUIT', function() {
                This.save();
            });
            process.on('SIGTERM', function() {
                This.save();
            });
            process.on('uncaughtException', function() {
                This.save();
            });
            process.on('exit', function() {
                This.save();
            });
        }
    }

    /**
     * Loads a persistent file to retrieve the classes information stored in it
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     * @param force Force to reload the file
     */
    public loadPersistentFile(options: IPersistentOptions, force: boolean) {
        try {
            let data: string | null;

            if (this.persistentObjects.containsKey(path.resolve(options.path)) == true && !force)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.init());
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
            if (Utils.isBrowser())
                data = localStorage.getItem(path.resolve(options.path));
            else
                data = fs.readFileSync(path.resolve(options.path), "utf8");
            if (data == null)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.deserialize(data));
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
        } catch (err) {
            if (options.debug) {
                console.log("Failed to load the persistent file '" + options.path + "'");
                console.log("Error: " + err);
            }
        }
    }

    /**
     * Stores the class instance to the storage
     * @param classInstance class instance to store
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     */
    public store(classInstance: any, options: IPersistentOptions) {
        this.loadPersistentFile(options, false);
        let className: string | null = Utils.getClassName(classInstance);
        if (className == null)
            return;
        let savedClass: any = options.plugin.get(this.persistentObjects.getValue(path.resolve(options.path)), className);

        if (savedClass != null) {
            for (let field in savedClass) {
                classInstance[field] = savedClass[field];
            }
        }
        options.plugin.put(this.persistentObjects.getValue(path.resolve(options.path)), className, classInstance);
    }

    /**
     * Retrieves a class instance by its name and its options
     * @param className class name
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     */
    public getInstanceOfClass(className: string, options: IPersistentOptions): any | null {
        let savedClass: any | null = options.plugin.get(this.persistentObjects.getValue(path.resolve(options.path)), className);

        return savedClass;
    }

    /**
     * Saves all classes stored in the storage using the plugin specified
     */
    public save() {
        let option: IPersistentOptions;
        let instance: any;

        for (let key of this.persistentObjects.keys()) {
            option = (<IPersistentOptions>this.persistentObjectsMetadata.getValue(key));
            instance = this.persistentObjects.getValue(key);

            if (option.debug)
                console.log("Trying to save the instance of the object '" + Utils.getClassName(instance) + "' to the path '" + key + "'");
            if (Utils.isBrowser())
                localStorage.setItem(key, option.plugin.serialize(instance));
            else
                fs.writeFileSync(key, option.plugin.serialize(instance));
            if (option.debug)
                console.log("The instance of the object '" + Utils.getClassName(instance) + "' has been saved to the path '" + key + "'");
        }
    }

    /**
     * Returns the number of class saved
     */
    public getSize(): number {
        return this.persistentObjects.size();
    }
};

export let storage: Storage;

//@ts-ignore
if (storage == undefined) {
    storage = new Storage();
}
