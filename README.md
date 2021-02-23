# Installation

`npm init -y`

`npm i typescript`

`npx tsc --init --rootdir src --outdir lib` --> initialize new ts config

`npx tsc` --> to compile the TS in JS
`npx tsc --watch` --> to recompile on-the-fly

`node lib/index.ts` --> to execute

## Some config

`target: es6` --> in tsconfig.json to compile in es6

`noImplicitAny: true` --> in tsconfig.json to permit 'any'

## Declatarions

`npm i @types/node` --> declaration types for node

`npm i @types/express` --> to support express in typescript

## An npm package

`npm init -y`
`npm i typescript -D`
`npx tsc --init --rootDir src --outDir lib --sourceMap --declaration --declarationMap`

in package.json
`main: lib`
`types: lib`
`scripts: { build: tsc }`

`npm publish`

## ts-node

TS cannot be run with node without a compiler, but `ts-node` can be used to skip the compile manual part

`npx ts-node src/index.ts`
`npm i ts-node` --> faster, no download

in package.json
`scripts: { start: 'ts-node src/index.ts'}` --> to use it as npm-run

## strict compiler

In tsconfig.json strict behavior can be set manually