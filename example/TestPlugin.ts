import { IPersistentPlugin } from "../src/plugin/IPersistentPlugin";

export class TestPlugin implements IPersistentPlugin {

    public init(): object {
        return <Object>{};
    }

    public serialize(object: object): string {
        return "Hello=" + object["instance"]["value"];
    }

    public deserialize(serializedObject: string): object {
        return {instance: {value: serializedObject.split("=")[1]}};
    }

    public get(object: object, className: string): object {
        if (object == null)
            return null;
        return object["instance"];
    }

    public put(object: object, className: string, classInstance: object): void {
        object["instance"] = classInstance;
    }

}