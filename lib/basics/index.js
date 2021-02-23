"use strict";
/**
 * primitive types:
 * boolean, number, string, undefined, null, symbol, bigint
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let notDefined = undefined;
// with es6 target
// let penta: symbol = Symbol('tempa');
/**
 * instance types:
 */
let regex = new RegExp('ab+c');
let array = [1, 2, 3];
// with es6 target
// let set = new Set([1, 3, 3, 3])
// with generics
let array2 = [1, 2, 3];
// with es6 target
//let set2: Set<number> = new Set([1, 2, 3, 4])
/**
 * Arrays and tuples
 */
let arr = [1, 2, 3];
arr = [1];
arr = [1, 2, 3, 4, 5];
// arr = ['ciao'] --> error
// tuple, fixed number
let tuple = [0, 0];
tuple = [4, 5];
/**
 * Object Types and Types Aliases
 */
let center = {
    x: 2,
    y: 4
};
let center2 = { x: 2, y: 4 };
/**
 * Const
 */
const ciao = { x: 3, y: 4 };
// const ciao == center --> error
/**
 * Function, with (or without) return type
 */
function add(a, b) {
    return a + b;
}
function print(message) {
    console.log(message);
}
function sum(...values) {
    return values.reduce((acc, cur) => acc + cur, 0);
}
sum(2, 4, 5); // result is 11
// functions as first class citizens
// inspired by arrow functions
let add2 = (a, b) => a + b;
let u = { id: '123' };
let p = { id: '234' };
// remember, typescript does not care about the NAME of the type
// as long as the structure is maintained
u = p;
p = u;
let p2 = { x: 1, y: 3 };
let p3 = { x: 1, y: 3, z: 3 };
// extra info is ok, duck typing:
// if says quack and walks like a duck, then it is a quack
p2 = p3;
/**
 * Classes
 */
class Animal {
    constructor(name) {
        this.name = name;
    }
    move(distanceMeters) {
        console.log(`${this.name} moved ${distanceMeters}m.`);
    }
}
let cat = new Animal('cat');
cat.move(10);
// typescript permits private, protected and public properties
// if target is ES5 the result is an awesome function 
// you cannot access cat.name in TS (but yes in JS)
// you may want to use #name variables, to have privacy in JS too
// JS transpiled code may vary depending on the ES target (at least ES6)
/**
 * Generics
 */
class Queue {
    constructor() {
        this.data = [];
    }
    push(item) { this.data.push(item); }
    pop() { return this.data.shift(); } // undefined check
}
const q = new Queue();
q.push(3);
// q.push('s') --> error
/**
 * Special type: any and unknown
 */
let exampleAny;
let exampleUnknown = 234;
// the any type permits to bypass typescript
exampleAny.allows.any.kind.of.chain();
// unknown is a typed version of any, it requires checks
if (typeof exampleUnknown === 'string') {
    console.log(exampleUnknown.charAt(3));
}
/**
 * JavaScript to TypeScript
 */
let hello;
hello.trim(); // not giving error
let hello2;
// hello2.trim() // error, requires sanity checks
if (typeof hello2 === 'string') {
    hello2.trim();
}
// quick migration: any
// more reliable migration: unknown
/**
 * Universal Utilities
 */
function log(value) {
    // use unknown and make checks
    if (typeof value === 'number') {
        console.log(value.toFixed(3));
    }
    else {
        console.log(value);
    }
}
/**
 * Type assertion
 */
let x = 'ciao';
// we tell the TS compiler to trust our knowledge of the type
let trimmed = x.trim();
let trimmed2 = x.trim(); // not recommended, not working in react
/**
 * Type casting
 */
let that;
that = '1234';
const num = +that; // type cohersion, NO TYPE CASTING
/**
 * Modules
 */
function isPalindrome(str) {
    return str === str.split('').reverse().join();
}
console.log('Logged in user', process.ENV.USER);
// npm i @types/node
// automatically provides declaration modules
/**
 * async/await
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const mainAdync = () => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
});
/**
 * ts-node
 */
// ts cannot be run with node without a compiler
// but ts-node can be used to skip the compile manual part
// npx ts-node src/index.ts
