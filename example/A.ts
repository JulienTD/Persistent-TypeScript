import { Persistent } from "../src/Persistent";
import { TestPlugin } from "./TestPlugin";
import { storage } from "../src/Storage";
import { JsonPlugin } from "../src/plugin/JsonPlugin";

@Persistent({path: "./aaa.txt", plugin: new JsonPlugin(false), debug: true, watcher: false})
export class A {
    public name: string;

    constructor(name: string, surname: string) {
        this.name = name;
    }
}
