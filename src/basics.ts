/** 
 * primitive types: 
 * boolean, number, string, undefined, null, symbol, bigint
 */

let notDefined: undefined = undefined

// with es6 target
// let penta: symbol = Symbol('tempa');

/**
 * instance types:
 */
let regex = new RegExp('ab+c')

let array = [1, 2, 3]

// with es6 target
// let set = new Set([1, 3, 3, 3])

// with generics
let array2: Array<number> = [1, 2, 3]

// with es6 target
//let set2: Set<number> = new Set([1, 2, 3, 4])

/**
 * Arrays and tuples
 */
let arr: number[] = [1, 2, 3];

arr = [1]
arr = [1, 2, 3, 4, 5]

// arr = ['ciao'] --> error

// tuple, fixed number
let tuple: [number, number] = [0, 0];

tuple = [4, 5]


/**
 * Object Types and Types Aliases
 */
let center: { x: number, y: number } = {
    x: 2,
    y: 4
}

// type alias
type Point = { x: number, y: number }

let center2: Point = { x: 2, y: 4 }

/**
 * Const
 */
const ciao: Point = { x: 3, y: 4 }
// const ciao == center --> error


/**
 * Function, with (or without) return type
 */
function add(a: number, b: number): number {
    return a + b;
}

function print(message: string): void {
    console.log(message)
}

function sum(...values: number[]) {
    return values.reduce((acc, cur) => acc + cur, 0)
}

sum(2, 4, 5) // result is 11

// functions as first class citizens
// inspired by arrow functions
let add2: (a: number, b: number) => number = (a, b) => a + b

// remember that we can create aliases
type NumberOperation = (a: number, b: number) => NumberOperation;

/**
 * Structural Typing
 */
type User = { id: string }
type Product = { id: string }

let u: User = { id: '123' }
let p: Product = { id: '234' }

// remember, typescript does not care about the NAME of the type
// as long as the structure is maintained
u = p
p = u

type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

let p2: Point2D = { x: 1, y: 3 }
let p3: Point3D = { x: 1, y: 3, z: 3 }

// extra info is ok, duck typing:
// if says quack and walks like a duck, then it is a quack
p2 = p3

/**
 * Classes
 */
export class Animal {

    // private is a TS keyword
    private name: string;

    constructor(name: string) {
        this.name = name
    }

    move(distanceMeters: number) {
        console.log(`${this.name} moved ${distanceMeters}m.`)
    }
}

let cat = new Animal('cat')
cat.move(10)

// typescript permits private, protected and public properties
// if target is ES5 the result is an awesome function 

// you cannot access cat.name in TS (but yes in JS)

// you may want to use #name variables, to have privacy in JS too
// JS transpiled code may vary depending on the ES target (at least ES6)

/**
 * Generics
 */
class Queue<T> {
    data: T[] = [];
    push(item: T) { this.data.push(item) }
    pop(): T | undefined { return this.data.shift() } // undefined check
}

const q = new Queue<number>()
q.push(3)

// q.push('s') --> error

/**
 * Special type: any and unknown
 */
let exampleAny: any
let exampleUnknown: unknown = 234

// the any type permits to bypass typescript
// --> exampleAny.allows.any.kind.of.chain()

// unknown is a typed version of any, it requires checks
if (typeof exampleUnknown === 'string') {
    console.log(exampleUnknown.charAt(3))
}

/**
 * JavaScript to TypeScript
 */
let hello: any

// ---> hello.trim() // no error at compile time, but at runtime

let hello2: unknown

// hello2.trim() // error, requires sanity checks
if (typeof hello2 === 'string') {
    hello2.trim()
}

// quick migration: any
// more reliable migration: unknown

/**
 * Universal Utilities
 */
function log(value: unknown) {
    // use unknown and make checks
    if (typeof value === 'number') {
        console.log(value.toFixed(3))
    } else {
        console.log(value)
    }
}

/**
 * Type assertion
 */
let x = 'ciao'

// we tell the TS compiler to trust our knowledge of the type
let trimmed = (x as string).trim()
let trimmed2 = (<string>x).trim() // not recommended, not working in react

/**
 * Type casting
 */
let that

that = '1234'

const num = +that // type coercion, NO TYPE CASTING

/**
 * Modules
 */
export function isPalindrome(str: string): boolean {
    return str === str.split('').reverse().join()
}

// to import the function in another module, LIKE IN JS
// import { isPaindrome } from './utils'

/**
 * Type Declarations
 */
declare const myProcess: any; // CANNOT be assigned

// install @types/node 

// console.log('Logged in user:', process.env.USER)

// declarations go into a file with extension '.d.ts'
// e.g. env.d.ts
declare const declaration1: any;
declare const declaration2: any;

// npm i @types/node
// automatically provides declaration modules from node
// for instance 'process' or 'fs', with documentation

// the package express is not writte in ts
// we can install the community maintained typed version
// with 'npm i @types/express'

/**
 * async/await
 */
const delay: (ms: number) => Promise<void> = (ms) => new Promise(res => setTimeout(res, ms))

const mainAdync = async () => {
    await delay(1000);
    console.log('1s');
}

/**
 * ts-node
 */
// ts cannot be run with node without a compiler
// but ts-node can be used to skip the compile manual part
// npx ts-node src/index.ts

