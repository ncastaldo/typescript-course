import { Animal } from '../basics/index'

/**
 * readonly modifier
 */
type ReadonlyPoint = {
    readonly x: number,
    y: number
}

const pp: ReadonlyPoint = { x: 1, y: 1 }

// cannot do pp.x = 3

class Anim {
    readonly name: string

    constructor(name: string) {
        this.name = name
    }
}

const sheep = new Animal('sheep')
// cannot modify name after construction
// remember, readonly is valid ONLY in the compile context, no JS

/**
 * Union Types: |
 */
function formatCommandLine(input: string | string[]) {
    let line : string = ''
    if (typeof input === 'string') {
        line = input.trim()
    } else {
        line = input.map(x => x.trim()).join(' ')
    }
    return line
}

formatCommandLine('ciao')
formatCommandLine(['ciao', 'caio'])

// union type extracted
type Padding = number | string[]

// readability
type Padding2 =
    | number
    | string[]

/**
 * Literal Type
 */
let direction: 'North' | 'East' | 'West' | 'South'
// only the defined literals are supported!

// better composition
type CardinalDirection = 'North' | 'East' | 'West' | 'South'

function move(distanceMeters: number, direction: CardinalDirection) {
    console.log(`Moving direction ${direction} by ${distanceMeters} meters.`)
}

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6

const rollDice = function (): DiceValue {
    return (Math.floor(Math.random() * 6) + 1) as DiceValue // forcing result to DiceValue type
}

/**
 * Custom Type Narrowing
 */

// in case of classes
class Cat { 
    meow () {
        console.log('meow')
    }
}
class Dog { 
    bark() {
        console.log('woof')
    }
}

type Animalibus = Cat | Dog

function speak(animal: Animalibus) {
    // to make checks
    if (animal instanceof Cat) {  // we are using 'instanceof'
        animal.meow()
    }
}

// in case of Objects
type Square = { size: number }
type Rectangle = { width: number, height: number }

type Shape = Square | Rectangle

function getArea(shape: Shape): number {
    if ('size' in shape) { // we are using the check of a property
        return shape.size ** 2 // valid, TS infers this is a Square
    }
    if ('width' in shape) {
        return shape.height * shape.width
    }
    return 0
}

/**
 * Discriminated Unions
 */
// add to custom types a common property, e.g. 'kind'

type Circle = { kind: 'circle', radius: number }
type Sphere = { kind: 'sphere', radius: number }

type ShapeWithKind =
    | Circle
    | Sphere

function area(shape: ShapeWithKind) : number {
    if (shape.kind === 'circle') {
        return shape.radius
    } 
    if (shape.kind === 'sphere') {
        return shape.radius * 19
    }
    throw new Error('Ups')
}



type ValidationSuccess = {
    isValid: true, // here actually setting the value true, not just the boolean type
    validatedValue: string
}

type ValidationFailure = {
    isValid: false,
    errorReason: string
}

type ValidationResult =
    | ValidationSuccess
    | ValidationFailure

function logResult(result: ValidationResult) {
    if (result.isValid) { // checking the 'isValid' property
        return result.validatedValue
    } else {
        return result.errorReason
    }
}

/**
 * Class parameter properties
 */
class Person {
    // shortcut to defining public name/surname and assigning them 
    // in the constructor
    // the visibility is mandatory (i.e. private/public/...)
    constructor(
        private name: string,
        private surname: string
    ) { }
    getFullName () : string {
        return this.name + ' ' + this.surname
    }
}

const nicola = new Person('nicola', 'c')
console.log(nicola.getFullName())

/**
 * Null and undefined
 */
let notDef: undefined = undefined
let notPres: null = null

null == undefined // true, with DOUBLE equal

let something
if (something == null) {
    console.log('Null or undefined: ', something)
}

function decorate(value: string | null | undefined) {
    if (value == null) {
        return value
    }
    return value.trim()
}

/**
 * Intersection Types: &
 */
type P2 = {
    x: number
    y: number
}

// type intersection, can be used in parameters too
type P3 = P2 & {
    z: number
}

/**
 * Optional modifiers: ?
 */
type House = {
    door: number,
    windows: number,
    garden?: boolean
}

const myHouse : House = {
    door: 2,
    windows: 4
}

class OptionalPoint {
    x?: number
    y?: number
}

const optionalPoint : OptionalPoint = new OptionalPoint();

optionalPoint.x = undefined

/**
 * Non-null assertion: !
 * COMPILE TIME ONLY
 */
type PP = {
    x: number,
    y: number
}

let uh: PP
function initialize() {
    uh = { x: 3, y: 2 }
}

initialize()
console.log('after initialization: ', uh!.x, uh!.y)
// telling TS to trust us on non-null values
// this is not a very good practice


function customStringify(n: number) {
    return '***' + n + '***'
}

function logOptionalPoint(optionalPoint : OptionalPoint) {
    console.log('Point', customStringify(optionalPoint.x!))
}


/**
 * Interfaces
 */

// interfaces are used for classes, whereas types are used for objects

interface IPoint2D {
    x: number,
    y: number
}

interface IPoint3D extends IPoint2D {
    z: number
}

// with objects, we used the & symbol

// interface are used to create hierarchy

/**
 * Interface declaration merging
 */

// 'express' base
interface Request {
    body: any;
}

// 'exoress' JSON
interface Request {
    json: any
}

// our App
function handleRequest(req: Request) {
    req.body
    req.json
}

// declaration merging is supported by interfaces, but not by type literals

/**
 * Types vs Interfaces
 */

/* 
Type:
- unions
- intersections (&)
- primitives
- shorthand functions
- advanced type functions

Interface:
- declaration merging, like in the express API
- familiarity... (extends)
*/

/**
 * never type
 */

// never returns -> return type is 'never'
const fail = (message: string) => {
    throw new Error('fail')
}

// also in infinite loops

// in this case I want to have an error
// in order ensure all cases are handled

function useShapeWithKind(shape: ShapeWithKind) {
    if (shape.kind === 'circle') {
        return shape.radius * 30
    }
    if (shape.kind === 'sphere') {
        return shape.radius * 40
    }
    const _ensureAllCasesAreHandles: never = shape
    return _ensureAllCasesAreHandles 
    // here returning just to tell ts that the function never returns undefined, but always a number
}

