type FullElement = {
    x: number,
    y: number
}

/**
 * Partial<T>
 */

type PartialImpl<T> = { [P in keyof T]?: T[P] | undefined; }


// relaxing the constraints
type PartialElement = Partial<FullElement>

/**
 * Required<T>
 */

type RequiredImpl<T> = { [P in keyof T]-?: T[P]; }

// requiring all elements must be present
type RequiredElement = Required<PartialElement>

// used for Configuration objects

/**
 * Readonly<T>
 */

type ReadonlyImpl<T> = { readonly [P in keyof T]: T[P]; }

// forcing the members as readonly
type ReadonlyElement = Readonly<FullElement>