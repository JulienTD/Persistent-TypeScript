import { IPersistentPlugin } from "./PersistentPlugin";
import { HashMap } from "../HashMap";

export class JsonPlugin implements IPersistentPlugin {

    public init(): object {
        return new HashMap();
    }

    public serialize(object: object): string {
        return (<HashMap>object).toJson();
    }

    public deserialize(serializedObject: string): object {
        return HashMap.fromJson(serializedObject);
    }

    public get(object: object, className: string): object {
        if (object == null)
            return null;
        return (<HashMap>object).getValue(className);
    }

    public put(object: object, className: string, classInstance: object): void {
        (<HashMap>object).put(className, classInstance);
    }

};