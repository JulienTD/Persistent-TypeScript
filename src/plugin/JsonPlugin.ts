import { IPersistentPlugin } from "./IPersistentPlugin";
import { Map } from "../utils/Map";

export class JsonPlugin implements IPersistentPlugin {

    private minified: boolean;

    public constructor(isMinified: boolean) {
        this.minified = isMinified;
    }

    public init(): object {
        return new Map();
    }

    public serialize(object: object): string {
        return (<Map>object).toJson(this.minified);
    }

    public deserialize(serializedObject: string): object | null {
        return Map.fromJson(serializedObject);
    }

    public get(object: object, className: string): object | null {
        if (object == null)
            return null;
        return (<Map>object).getValue(className);
    }

    public put(object: object, className: string, classInstance: object): void {
        (<Map>object).put(className, classInstance);
    }

};