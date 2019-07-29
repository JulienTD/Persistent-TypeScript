import { Persistent } from "../src/Persistent";
import { TestPlugin } from "./TestPlugin";
import { A } from "./A"

@Persistent()
class Person {
    public name: string;
    public surname: string;
    public msg: string;

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
        this.msg = "test";
    }

    public print() {
        console.log("Im printing");
        console.log(this.msg);
    }
}

@Persistent({path: "./hello_world.txt", plugin: new TestPlugin(), debug: false, watcher: true})
class Test {
    public value: string;

    constructor(str: string) {
        this.value = str;
    }
};

@Persistent()
class Lol {
    public xd: string;
    public aaa: number;

    constructor(a: string, b: number) {
        this.xd = a;
        this.aaa = b;
    }
};

let person: Person = new Person("name", "surname");
let lol: Lol = new Lol("issou", 89);
let test: Test = new Test("World!");
let a: A = new A("aaa", "a");

console.log(person);
console.log(lol);
console.log(test);
console.log(a);
console.log(test);
test.value = "meaaaaa!";

person.name = "testtestetst";
lol.aaa = 42;
person.surname = "Julien";
person["hakuna"] = "matata";
a.name = "ngdognsongdkgdgdsnkgdsngdskngdslkngdsksldgngdsngdsng";
console.log(a);
for (let i = 0; i < 1000000; i++) {
    // console.log(test.value);
}
let aaa: A = new A("fffff", "f");
console.log("------");
console.log(aaa);

aaa.name = "i've changed";
console.log(a);

test.value = "kfdslfdslfds";