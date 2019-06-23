export interface IPersistentPlugin {
    init: () => object;
    serialize: (object: object) => string;
    deserialize: (serializedObject: string) => object;
    get: (object: object, className: string) => object;
    put: (object: object, className: string, classInstance: object) => void;
};
