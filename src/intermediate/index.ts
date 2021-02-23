/**
 * readonly modifier
 */
type ReadonlyPoint = {
    readonly x: number,
    y: number
}

const pp: ReadonlyPoint = { x: 1, y: 1 }

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
 * Union Types
 */
function formatCommandLine(input: string | string[]) {
    return 'ok'
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
    return (Math.floor(Math.random() * 6) + 1) as DiceValue // forcing result to DiceValueype
}

/**
 * Custom Type Narrowing
 */
class Cat { }
class Dog { }

type Animalibus = Cat | Dog

function speak(animal: Animalibus) {
    // to make checks
    if (animal instanceof Cat) { }
}

// in case of Objects
type Square = { size: number }
type Rectangle = { width: number, height: number }

type Shape = Square | Rectangle

function getArea(shape: Shape): number {
    if ('size' in shape) {
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

type ValidationSuccess = {
    isValid: true, // here actually saying TRUE, not just boolean
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
    if (result.isValid) { } // checking the 'isValid' property
}

/**
 * Class parameter properties
 */
class Person {
    // shortcut to defining public name/surname and assigning them 
    // in the constructor
    constructor(
        public name: string,
        public surname: string
    ) { }
}

const nicola = new Person('nicola', 'c')

/**
 * Null and undefined
 */
let notDef: undefined = undefined
let notPres: null = null

null == undefined // true, with double equal

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
 * Intersection Types
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
 * Optional modifiers
 */
type House = {
    door: number,
    windows: number,
    garden?: boolean
}

/**
 * Non-null assertion, COMPILE TIME ONLY
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
// not so good practice