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
        console.log("[Persistent] Initialization done !");
    }

    /**
     * Loads a persistent file to retrieve the classes information stored in it
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     * @param force Force to reload the file
     */
    public loadPersistentFile(options: IPersistentOptions, force: boolean) {
        try {
            if (this.persistentObjects.containsKey(path.resolve(options.path)) == true && !force)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.init());
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
            let data = null;
            if (Utils.isBrowser()) {
                data = localStorage.getItem(path.resolve(options.path));
            } else {
                data = fs.readFileSync(path.resolve(options.path), "utf8");
            }
            if (data == null || data === undefined)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.deserialize(data));
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
        } catch (err) {

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
     * Saves all classes stored in the storage using the plugin specified
     */
    public save() {
        console.log("[Persistent] Saving classes ...");
        for (let key of this.persistentObjects.keys()) {
            if (Utils.isBrowser()) {
                localStorage.setItem(key,
                    (<IPersistentOptions>this.persistentObjectsMetadata.getValue(key)).plugin.serialize(this.persistentObjects.getValue(key)));
            } else {
                fs.writeFileSync(
                    key,
                    (<IPersistentOptions>this.persistentObjectsMetadata.getValue(key)).plugin.serialize(this.persistentObjects.getValue(key))
                );
            }
        }
        console.log("[Persistent] Done !");
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
