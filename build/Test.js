"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Persistent_1 = require("./Persistent");
var Person = /** @class */ (function () {
    function Person(name, surname) {
        this.name = name;
        this.surname = surname;
        this.msg = "test";
    }
    Person.prototype.print = function () {
        console.log("Im printing");
        console.log(this.msg);
    };
    Person = __decorate([
        Persistent_1.Persistent(),
        __metadata("design:paramtypes", [String, String])
    ], Person);
    return Person;
}());
var Lol = /** @class */ (function () {
    function Lol(a, b) {
        this.xd = a;
        this.aaa = b;
    }
    Lol = __decorate([
        Persistent_1.Persistent(),
        __metadata("design:paramtypes", [String, Number])
    ], Lol);
    return Lol;
}());
;
var person = new Person("name", "surname");
var lol = new Lol("issou", 89);
console.log(person);
console.log(lol);
person.name = "testtestetst";
lol.aaa = 42;
