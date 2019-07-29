import { IPersistentPlugin } from "./IPersistentPlugin";
import { Map } from "../utils/Map";
import { Utils } from "../utils/Utils";

export class JsonPlugin implements IPersistentPlugin {

    private minified: boolean;

    public constructor(isMinified: boolean) {
        this.minified = isMinified;
    }

    public init(): object {
        return new Map();
    }

    public serialize(object: object): string {
        if (Utils.isBrowser())
            return (<Map>object).toJson(true);
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