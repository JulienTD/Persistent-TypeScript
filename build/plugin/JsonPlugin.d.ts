import { IPersistentPlugin } from "./IPersistentPlugin";
export declare class JsonPlugin implements IPersistentPlugin {
    private minified;
    constructor(isMinified: boolean);
    init(): object;
    serialize(object: object): string;
    deserialize(serializedObject: string): object | null;
    get(object: object, className: string): object | null;
    put(object: object, className: string, classInstance: object): void;
}
