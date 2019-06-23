import { IPersistentDeserializer } from "./IPersistentDeserializer";

export class JsonDeserializer implements IPersistentDeserializer {

    public deserialize(serializedObject: string): object {
        return JSON.parse(serializedObject);
    }

}