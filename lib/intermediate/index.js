"use strict";
const pp = { x: 1, y: 1 };
class Anim {
    constructor(name) {
        this.name = name;
    }
}
const sheep = new Animal('sheep');
// cannot modify name after construction
// remember, readonly is valid ONLY in the compile context, no JS
/**
 * Union Types
 */
function formatCommandLine(input) {
    return 'ok';
}
formatCommandLine('ciao');
formatCommandLine(['ciao', 'caio']);
/**
 * Literal Type
 */
let direction;
function move(distanceMeters, direction) {
    console.log(`Moving direction ${direction} by ${distanceMeters} meters.`);
}
const rollDice = function () {
    return (Math.floor(Math.random() * 6) + 1); // forcing result to DiceValueype
};
/**
 * Custom Type Narrowing
 */
class Cat {
}
class Dog {
}
function speak(animal) {
    // to make checks
    if (animal instanceof Cat) { }
}
function getArea(shape) {
    if ('size' in shape) {
        return Math.pow(shape.size, 2); // valid, TS infers this is a Square
    }
    if ('width' in shape) {
        return shape.height * shape.width;
    }
    return 0;
}
function logResult(result) {
    if (result.isValid) { } // checking the 'isValid' property
}
/**
 * Class parameter properties
 */
class Person {
    // shortcut to defining public name/surname and assigning them 
    // in the constructor
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
}
const nicola = new Person('nicola', 'c');
/**
 * Null and undefined
 */
let notDef = undefined;
let notPres = null;
null == undefined; // true, with double equal
let something;
if (something == null) {
    console.log('Null or undefined: ', something);
}
function decorate(value) {
    if (value == null) {
        return value;
    }
    return value.trim();
}
let uh;
function initialize() {
    uh = { x: 3, y: 2 };
}
initialize();
console.log('after initialization: ', uh.x, uh.y);
// telling TS to trust us on non-null values
// not so good practice
