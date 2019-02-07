<template>
  <canvas
    width="500"
    height="500"
    @mousemove="mouseMoved"
  />
</template>

<script>
import { toNormalizedCoordinates } from '../graphics';
import Vector from '../Vector';

export default {
    props: {
        simulation: {
            type: Object,
            default: null,
        },
    },
    mounted() {
        const frameCallback = time => {
            this.simulation.integrateTime(time);
            this.simulation.redraw();
            requestAnimationFrame(frameCallback);
        };

        requestAnimationFrame(frameCallback);
    },
    methods: {
        mouseMoved(event) {
            const canvas = this.simulation.drawing.context.canvas;
            const { left, top } = canvas.getBoundingClientRect();
            const position = new Vector(event.clientX - left, event.clientY - top);
            this.$emit('mousemove', toNormalizedCoordinates(position, canvas));

            // XXX Test do I need this?
            // If you need the bounding rectangle relative to the top-left corner of the document,
            // just add the current scrolling position to the top and left properties (these can be obtained
            // using window.scrollX and window.scrollY) to get a bounding rectangle which is independent
            // from the current scrolling position.
        }
    }
};
</script>
