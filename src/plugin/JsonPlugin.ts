import { IPersistentPlugin } from "./IPersistentPlugin";
import { Map } from "../utils/Map";

export class JsonPlugin implements IPersistentPlugin {

    public init(): object {
        return new Map();
    }

    public serialize(object: object): string {
        return (<Map>object).toJson();
    }

    public deserialize(serializedObject: string): object {
        return Map.fromJson(serializedObject);
    }

    public get(object: object, className: string): object {
        if (object == null)
            return null;
        return (<Map>object).getValue(className);
    }

    public put(object: object, className: string, classInstance: object): void {
        (<Map>object).put(className, classInstance);
    }

};