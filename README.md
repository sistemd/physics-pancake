# physics-pancake

Select a demo, and use left click to move and throw particles around.

A build is available online at https://ennmichael.github.io/physics-pancake-demos/.

## Implementation notes

This is a demo of a 2D physics engine.
In the future, it will probably support both rigidbody simulation and mass aggregate simulation.
For now, only mass aggregate simulation is supported.

The code was written with some level of simplicity in mind.
A clear demonstration and application of physics simulation concepts was the goal.

This project was initially written in Javascript, but eventually TypeScript support was added. This is not complete yet.
That's why the vue files are still in plain JS rather than TypeScript.

## Project setup
```
npm install
```
or
```
npm install --save-dev
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
By default, the project is set up to build files ready for deployment at https://ennmichael.github.io/physics-pancake-demos.
You should probably use `npm run serve` or delete or modify the `vue.config.js` file.

### Run the tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
