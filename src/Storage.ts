import { Utils } from "./Utils";
import { HashMap } from "./HashMap";
import { Persistent, IPersistentOptions } from "./Persistent";
import * as fs from 'fs';
import * as process from "process";

export class Storage {
    private persistentObjects: HashMap = null;

    constructor() {
        let This = this;
        this.loadPersistentFile(".persistent.json");
        if (this.persistentObjects == null)
            this.persistentObjects = new HashMap();
        process.on('exit', function(code) {
            return This.save();
        });
        console.log("[Persistent] Initialization done !");
    }

    private loadPersistentFile(filePath: string/*, options: IPersistentOptions*/) {
        try {
            let data = fs.readFileSync(filePath, "utf8");
            if (data == null || data === undefined)
                return;
            this.persistentObjects = HashMap.fromJson(data); // options.deserializer.deserialize(data);// HashMap.fromJson(data); // Deserialization
        } catch (err) {

        }
    }

    public store(classInstance: Object, options: Object) {
        let className: string = Utils.getClassName(classInstance);
        let savedClass = this.persistentObjects.getValue(className);

        if (savedClass != null) {
            for (let field in savedClass) {
                classInstance[field] = savedClass[field];
            }
        }
        this.persistentObjects.put(className, classInstance);
    }

    public save() {
        console.log("[Persistent] Saving classes ...");
        fs.writeFileSync('.persistent.json', this.persistentObjects.toJson()); // Serialization
        console.log("[Persistent] Done !");
    }
};

export let storage: Storage;

if (storage == null || storage === null)
    storage = new Storage();
