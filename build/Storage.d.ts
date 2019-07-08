import { IPersistentOptions } from "./Persistent";
export declare class Storage {
    private persistentObjects;
    private persistentObjectsMetadata;
    constructor();
    /**
     * Loads a persistent file to retrieve the classes information stored in it
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     * @param force Force to reload the file
     */
    loadPersistentFile(options: IPersistentOptions, force: boolean): void;
    /**
     * Stores the class instance to the storage
     * @param classInstance class instance to store
     * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
     */
    store(classInstance: any, options: IPersistentOptions): void;
    /**
     * Saves all classes stored in the storage using the plugin specified
     */
    save(): void;
}
export declare let storage: Storage;
