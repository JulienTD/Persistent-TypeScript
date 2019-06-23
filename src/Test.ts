import { Persistent } from "./Persistent";

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
console.log(person);
console.log(lol);

person.name = "testtestetst";
lol.aaa = 42;
person.surname = "Julien";