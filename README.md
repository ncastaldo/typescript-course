# Installation

## New project

`npm init -y`

`npm i typescript`

`npx tsc --init --rootdir src --outdir lib` --> to initialize new tsconfig.json, setting 'src' as input folder and 'lib' as output folder

## Current Project

`npm install`

# Compilation

`npx tsc` --> to compile the TS in JS

`tsc` --> if typescript installed globally

`npx tsc --watch` --> to recompile on-the-fly

`node lib/index.ts` --> to execute

# The config file

`target: es6` --> in tsconfig.json to compile in es6

`strict: true` --> in tsconfig.json for strict behavior, i.e. only ts allowed

`noImplicitAny: true` --> in tsconfig.json to avoid 'any', i.e. 'any' is not allowed at all

# Declarations

`npm i @types/node` --> declaration types for node

`npm i @types/express` --> to support express in typescript

# Publish an npm package

`npm init -y`

`npm i typescript -D`

`npx tsc --init --rootDir src --outDir lib --sourceMap --declaration --declarationMap`

in package.json
- `main: lib`
- `types: lib`
- `scripts: { build: tsc }`

`npm publish`

# Typescript and node

TS cannot be run with node without a compiler, but `ts-node` can be used to skip the compile manual part

`npx ts-node src/index.ts`

`ts-node src/index.ts`--> if installed globally

in package.json

`scripts: { start: 'ts-node src/index.ts'}` --> to use it as npm-run
