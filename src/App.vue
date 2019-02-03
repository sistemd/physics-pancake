<template>
  <div>
    <canvas
      width="300"
      height="300"
    />
        <button @click="onEnter">New</button>
    <DemoChoice />
  </div>
</template>

<script>
import DemoChoice from './components/DemoChoice';
import Line from './Line';
import Vector2 from './Vector2';
import { clearContext, drawLine, drawCircle } from './graphics';

export default {
    components: { DemoChoice },
    data() {
        return {
            lines: [
                new Line({ origin: Vector2.zero, end: Vector2.zero }),
                new Line({ origin: Vector2.zero, end: Vector2.zero }),
            ],
        };
    },
    methods: {
        onEnter() {
            this.lines[0] = randomLine();
            this.lines[1] = randomLine();

            const intersection = this.lines[0].intersection(this.lines[1]);
            const context = document.getElementsByTagName('canvas')[0].getContext('2d');
            clearContext(context, 'white');
            drawLine(context, this.lines[0], 'green');
            drawLine(context, this.lines[1]);

            console.log(`   {
        lines:[
            new Line({
                origin: new Vector2(${this.lines[0].origin.x}, ${this.lines[0].origin.y}),
                end: new Vector2(${this.lines[0].end.x}, ${this.lines[0].end.y}),
            }),
            new Line({
                origin: new Vector2(${this.lines[1].origin.x}, ${this.lines[1].origin.y}),
                end: new Vector2(${this.lines[1].end.x}, ${this.lines[1].end.y}),
            }),
        ],
        intersection: ${(intersection) ? `new Vector2(${intersection.x}, ${intersection.y})` : 'undefined'},
    },`);

            if (intersection)
                drawCircle(context, { position: intersection, radius: 0.01 }, 'red');

            function randomLine() {
                return new Line({ origin: randomVector(), end: randomVector() });
            }

            function randomVector() {
                return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
            }
        }
    },
};
</script>
