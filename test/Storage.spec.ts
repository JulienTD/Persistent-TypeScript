import { expect } from 'chai';
import { storage } from "../build/Storage";
import { JsonPlugin } from "../build/plugin/JsonPlugin";
import { it, describe } from 'mocha';

class Test {
    private a: string;

    constructor(text: string) {
        this.a = text;
    }
}

describe('Storage', () => {
    it('should store class instance', () => {
        let instance: Test = new Test("storage spec");

        storage.store(instance, {path: "./storage_spec.txt", plugin: new JsonPlugin(false), debug: false});
        expect(storage.getSize()).to.equal(1);
    });
});
