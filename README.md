# physics-pancake

## Notes

### Approach resolution
The alternative technique to interpenetration resolution is approach
resolution. I figured this might be practical since I'm using a fixed
timestep. It is not.

The basic idea was to, instead of letting objects penetrate into one
another and then pull them away from one another, try to predict when
a penetration would happen and resolve it *before* it even happens.
This might be nice as it would allow one to compose his terrain
out of line segments rather than polygons.

One thing that did kind of work out was the collision prediction. With a fixed
timestep, predicting a collision with *almost* complete certainty is trivial.

The thing that did not work out was actually resolving the approach.
I have tried to place the particle directly on top of the terrain line.
I was hoping that with every next update the engine would register
a collision between the particle position and the terrain line.
However, due to numeric instabilities, this does not always happen
(although sometimes it does) and sometimes the particle would end
up falling through the terrain.

To amend this, I tried placing the particle a bit further from the
terrain line, so as to not have the particle sit directly on top of it
and therefore the collision can be predicted better rather than being
missed. The problem with the fix, however, was that getting the offset right
was too tricky to be relied on, and though the particle would fall through
the terrain less often, it would still sometimes happen.

After that, I realized there's much more complexity to this
than I thought, and I gave up. I do believe this is possible
(I am more than sure of it), but there must be a better way
of approach resolution than the one I figured.

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
