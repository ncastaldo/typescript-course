/**
 * typeof type operator
 */

const jsonResponse = {
    x: 0,
    y: 1
}

// generates a type from a variable
type JsonPoint = typeof jsonResponse

// can be used inline too
const hello : typeof jsonResponse = { x: 0, y: 3 }

function processResponse(response: JsonPoint) {
    
}

/**
 * Lookup tables
 */

// we need to define the type in order to use it in a function:

type element = {
    s: string,
    n: number,
    o: CustomType
}

type CustomType = {
    key: string
}

function getS2(): CustomType {
    return {
        key: 'hello'
    }
}

// all of this can be avoided with lookup types, to avoid type pollution
type element2 = {
    s: string,
    n: number,
    o: {
        key: string
    }
}

function getBetterS2(): element2['o'] {
    return {
        key: 'hello'
    }
}

// how to use it in case of arrays?

type element3 = {
    arrayOfMen: {
        name: string,
        surname: string
    }[]
}

type Man = element3['arrayOfMen'][0]

/**
 * keyof type operator
 */

// this way we are telling ts that the key is specific to the type Man
function logGetMan(obj: Man, key: keyof Man) {
    const value = obj[key]
    console.log('Getting:', key, value)
    return value
}

// we can also use generics
function logGetGeneric<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
    const value = obj[key]
    console.log('Getting:', key, value)
    return value // value is inferred to be Obj[Key]
}

function logSetGeneric<Obj, Key extends keyof Obj>(obj: Obj, key: Key, value: Obj[Key]) {
    console.log('Setting:', key, value)
    obj[key] = value
}

// Obj[Key] is a lookup type!

/**
 * Conditional Types
 */

// typescript 
type IsNumber<T> =
    T extends number
    ? 'number'
    : 'other'

type WithNumber = IsNumber<number>
type WithOther = IsNumber<string>

// VS javascript
const isNumber = (value: unknown) =>
    typeof value === 'number'
    ? 'number'
    : 'other'

const withNumber = isNumber(123)
const withOther = isNumber('hello')

// ---> may be used to extend the built in types in typescript

/**
 * Conditional Types with Unions and never
 */

// const notAllowed: never = 'some string' // error!

function error(message: string): never {
    throw new Error(message)
};

const strange: string = error('I will not return') // this is still valid!

// we can assign a never to every other type!

// these two types are equivalent!!!! very important concept
type Verbose = string | never
type Concise = string

// let us exclude null and undefined from T
type NoEmpty<T> = T extends null | undefined ? never : T

type Example = NoEmpty<string | null>
type ExampleExpanded = NoEmpty<string> | NoEmpty<null>
type ExampleSuperExpanded = 
    (string extends null | undefined ? never : string)
    | (null extends null | undefined ? never : string)
type ExampleAlmostThere = 
    string
    | never
type ExampleFinally = string

/**
 * infer keyword ReturnType<T>
 */

type IsArray<T> =
    T extends Array<any>
    ? 'array'
    : 'other'

type WithArray = IsArray<string[]>
type WithNotAwway = IsArray<number>

// by using the 'infer' keyword
type IsArrayPlus<T> = 
    T extends Array<infer Member>
    ? 'array'
    : 'other'

// an example:
type UnboxArray<T> = 
    T extends Array<infer Member>
    ? Member
    : T

// ReturnType<T> 
function createPerson(firstName: string, lastName: string) {
    return {
        firstName,
        lastName
    }
}

// just the implementation
type MyReturnType<T> = 
    T extends (...args: any) => any
    ? any
    : never

type PersonAgain = MyReturnType<typeof createPerson>

function logPerson(person: PersonAgain) {
    console.log(person.firstName)
}

// ---> ReturnType<T> is already in the ts compiler

// we can also use it inline
function logPerson2(person: ReturnType<typeof createPerson>) {
    console.log(person.firstName)
}

// this is the situation when the input of a function depends
// on the output of another function

/**
 * Mapped Types
 */

type Poooint = {
    x: number,
    y: number
}

const center: Poooint =  {
    x: 0,
    y: 0
}

// if we want 'center' as a constant
type ReadonlyPooooint = {
    readonly x: number,
    readonly y: number
}

// however, this way we are creating code duplication
// so, we can use Mapped Types

type ReadonlyPoiiint  =  {
    readonly [Item in 'x' | ' y']: number // applying the readonly to all the properties
}

type ReadonlyPointtt = {
    readonly [Item in keyof Poooint]: number
}

// with the LookupTable
type ReadonlyPppoint = {
    readonly [Item in keyof Poooint]: Poooint[Item]
}

// best: generic
type ReadonlyGeneric<T> = {
    readonly [Item in keyof T]: T[Item]
}

const bestReadonlyCenter: ReadonlyGeneric<Poooint> = {
    x: 0, 
    y: 0
}

// ---> Readonly<T> is already in the ts compiler

/**
 * Mapped type modifiers
 */

export type Dot = {
    readonly x: number,
    y?: number
}

export type Mapped<T> = {
    // minus sign to remove a property
    // plus sign to ensure a property
    -readonly [P in keyof T]+?: T[P] 
} 

type OptionalEditablelDot = Mapped<Dot>

// best usage

export type MyPartial<T> = {
    [P in keyof T]?: T[P] // with the '?' modifier
}

export class State<T> {
    constructor(public current: T) {}
    update(next: MyPartial<T>) {
        this.current = {...this.current, ...next}
    }
}

const state = new State({x: 0, y: 0})
state.update({ y: 3 }) // now we can pass only a part of T

// ---> Partial<T> is already in the ts compiler