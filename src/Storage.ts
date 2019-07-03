import { Utils } from "./utils/Utils";
import { Map } from "./utils/Map";
import { Persistent, IPersistentOptions } from "./Persistent";
import * as fs from 'fs';
import * as process from "process";
import * as path from "path";

export class Storage {
    private persistentObjects: Map = null;
    private persistentObjectsMetadata: Map = null;

    constructor() {
        let This = this;
        this.persistentObjects = new Map();
        this.persistentObjectsMetadata = new Map();
        process.stdin.resume();
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
        console.log("[Persistent] Initialization done !");
    }

    public loadPersistentFile(options: IPersistentOptions, force: boolean) {
        try {
            if (this.persistentObjects.containsKey(path.resolve(options.path)) == true && !force)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.init());
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
            let data = fs.readFileSync(path.resolve(options.path), "utf8");

            if (data == null || data === undefined)
                return;
            this.persistentObjects.put(path.resolve(options.path), options.plugin.deserialize(data));
            this.persistentObjectsMetadata.put(path.resolve(options.path), options);
        } catch (err) {

        }
    }

    public store(classInstance: Object, options: IPersistentOptions) {
        this.loadPersistentFile(options, false);
        let className: string = Utils.getClassName(classInstance);
        let savedClass = options.plugin.get(this.persistentObjects.getValue(path.resolve(options.path)), className);

        if (savedClass != null) {
            for (let field in savedClass) {
                classInstance[field] = savedClass[field];
            }
        }
        options.plugin.put(this.persistentObjects.getValue(path.resolve(options.path)), className, classInstance);
    }

    public save() {
        console.log("[Persistent] Saving classes ...");
        for (let key of this.persistentObjects.keys()) {
            fs.writeFileSync(
                key,
                (<IPersistentOptions>this.persistentObjectsMetadata.getValue(key)).plugin.serialize(this.persistentObjects.getValue(key))
            );
        }
        console.log("[Persistent] Done !");
    }
};

export let storage: Storage;

if (storage == null || storage === null)
    storage = new Storage();
