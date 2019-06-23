import { IPersistentPlugin } from "./IPersistentPlugin";

export class TestPlugin implements IPersistentPlugin {

    public init(): object {
        return {};
    }

    public serialize(object: object): string {
        // console.log("Serialize: " + object["value"]);
        // console.log("Serialize !");
        // console.log(object);
        return "Hello=" + object["instance"]["value"];
    }

    public deserialize(serializedObject: string): object {
        // console.log("Deserialize: " + serializedObject.split("=")[1]);
        return {instance: {value: serializedObject.split("=")[1]}};
    }

    public get(object: object, className: string): object {
        if (object == null)
            return null;
        return object["instance"];
    }

    public put(object: object, className: string, classInstance: object): void {
        // console.log("Put: " + classInstance["value"]);
        object["instance"] = classInstance;
        // console.log("OBJ:");
        // console.log(object);
        // console.log("OBJ INSTNACE:");
        // console.log(classInstance);
    }

};