/**
 * Implements
 */

// force a class to implement all the methods defined in the type

type AnimalType = {
    name: string,
    voice(): string
}

class CatType implements AnimalType {
    constructor(public name: string) {}
    voice() { return 'meow'}
}

/**
 * Definite Assignment Assertion
 */

let dice!: number // telling javascript this variable is definitely assigned

function rollDice2() {
    dice = (Math.floor(Math.random() * 6) + 1)
}

rollDice2()
console.log(dice)

// another usage
class PointX {
    x!: number
    y!: number
    constructor() {
        this.moveRandom()
    }
    moveRandom() {
        this.x = 3
        this.y = 3
    }
}

/**
 * User Defined Type Guards
 */

function isSquare(shape: Shape): shape is Shape {
    return 'size' in shape
}

// with the shape is Shape we are explicitely saying what is the check

/**
 * Assertion functions
 */

type PersonAssertion = {
    name: string,
    dateOfBirth?: Date
}

function loadPerson() {
    if (Date.now() % 2) {
        return {
            surname: 'rossi'
        }
    } else {
        return {
            name: 'mario'
        }
    }
}

// only returns if the condition is met
function myAssertFunction(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(message)
}

// only returns if the value is Date
function myAssertDateFunction(value: unknown): asserts value is Date {
    if (value instanceof Date) return
    throw new TypeError('The value is not a Date!')
}

const maybePerson = loadPerson()

myAssertFunction(maybePerson != null, 'Could not load person')
console.log('Name:', maybePerson.name)

myAssertDateFunction(maybePerson)

// Application Code: User Defined Type Guards
// Testing Code: Assertion Functions

/**
 * Function Overloading
 */

// typescript signatures
function reverse(string: string): string
function reverse(stringArray: string[]) : string[]

// HOWEVER only an implementation of 'reverse' is possible
// because javascript does not support different signatures
function reverse(stringOrStringArray: string | string[]){
    if (typeof stringOrStringArray == 'string') {
        return stringOrStringArray.split('').reverse().join()
    } else {
        return stringOrStringArray.slice().reverse()
    }
}

const sss = reverse('sss') // sss is a string
const s_s_s = reverse(['s', 's', 's']) // s_s_s is an array

// another important usage: force parameters structure!

function makeDate(timestamp: number): Date
function makeDate(year: number, month: number, day: number): Date
function makeDate(timestampOrYear: number, month?: number, day?: number): Date {
    if (month != null && day != null){
        return new Date(timestampOrYear, month - 1, day)
    } else {
        return new Date(timestampOrYear)
    }
}

const doomsday = makeDate(2000, 1, 1)
const epoch = makeDate(0)

// without function overloads:
// const invalid = makeDate(2000, 1 /* Error: ignored */)

/**
 * Call signatures
 */

// signature (short form)
type Add = (a: number, b: number, c?: number) => number;

const add: Add = (a: number, b: number, c?: number) =>  {
    return a + b + (c!= null ? c : 0);
}

// long form
type Add2 = {
    (a: number, b: number): number
    (a: number, b: number, c: number): number
}

// more
type PointCreator = new (x: number, y: number) => { x: number, y: number }
const PointClass: PointCreator = class AnotherPoint {
    constructor(public x: number, public y: number) {}
}

// long form
type PointCreator2 = {
    new(x: number, y: number): { x: number, y: number}
}

/**
 * Abstract classes
 */

// very similar to Java, for instance
abstract class Command {
    abstract commandLine(): string
    
    execute() {
        console.log('Executing:', this.commandLine())
    }
}

class GitResetCommand extends Command {
    commandLine(): string {
        return 'git reset --hard'
    }
}

new GitResetCommand().execute()

// new Command() is invalid -> it is abstract!