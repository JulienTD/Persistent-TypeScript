import { IPersistentSerializer } from "./IPersistentSerializer";

export class JsonSerializer implements IPersistentSerializer {

    public serialize(object: object): string {
        return JSON.stringify(object);
    }

}
