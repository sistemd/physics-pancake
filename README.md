# physics-pancake

Select a demo, and use right click to move and throw particles around.

## Implementation notes

Normaly, when checking intersections, we should first check if the bounding boxes of the
two objects overlap. This is a fast check. If they don't overlap, the objects definitely are
not intersecting. If they do overlap, then we should do the more specific check. I avoided
doing this in the engine for the sake of simplicity.

There is also an optimisation you can do when checking if a polygon contains a point. When
constructing the polygon object, check its convexity. If it's convex, the algorithm for checking
if a point is contained can be made to run faster.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run the tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
