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
        }
    }
};
</script>
