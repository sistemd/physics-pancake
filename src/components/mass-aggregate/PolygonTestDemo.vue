<template>
    <div>
        <canvas width="400" height="400"></canvas>
        <button @click="onClick">Move</button>
    </div>
</template>

<script>
import { clearContext, drawPolygon, drawCircle, drawLine } from '../../graphics';
import { randomRange } from '../../utils';
import Polygon from '../../Polygon';
import Vector from '../../Vector';

function randomPoint() {
    return new Vector(randomRange(-1, 1), randomRange(-1, 1));
};

export default {
    data() {
        return {
            polygon: Polygon.fromVertices([
                new Vector(-0.8, 0.8),
                new Vector(0.8, 0.8),
                new Vector(0, -0.8),
            ]),
            point: randomPoint(),
        };
    },
    mounted() {
        const context = document.getElementsByTagName('canvas')[0].getContext('2d');

        const cb = () => {
            clearContext(context, 'white');
            drawPolygon(context, this.polygon, 'green');
            const style = (this.polygon.containsPoint(this.point)) ? 'red' : 'bue';
            drawCircle(context, { position: this.point, radius: 6e-3 }, style);
            drawLine(context, this.polygon.closestEdge(this.point), 'red');
            requestAnimationFrame(cb);
        };

        requestAnimationFrame(cb);
    },
    methods: {
        onClick() {
            this.point = randomPoint();
            const vertices = this.polygon.vertices.map(({ x, y }) => `new Vector(${x}, ${y})`);
            console.log(`Polygon.fromEdges[${vertices.join(', ')}]`);
            console.log(`new Vector(${this.point.x}, ${this.point.y})`);
            const edge = this.polygon.closestEdge(this.point);
            const origin = `new Vector(${edge.origin.x}, ${edge.origin.y})`;
            const end = `new Vector(${edge.end.x}, ${edge.end.y})`;
            console.log(`new Line({ origin: ${origin}, end: ${end} })`);
            console.log('---');
        },
    },
};
</script>
