export interface IPersistentPlugin {

    /**
     * Init a storage object if no one has ever been created in a file.
     */
    init: () => object;

    /**
     * Serializes the storage object.
     */
    serialize: (object: object) => string;

    /**
     * Deserializes the storage object.
     */
    deserialize: (serializedObject: string) => object;

    /**
     * Retrieves class' data from the storage object and the class name.
     */
    get: (object: object, className: string) => object;

    /**
     * Puts the class instance's data inside the storage object.
     */
    put: (object: object, className: string, classInstance: object) => void;
};
