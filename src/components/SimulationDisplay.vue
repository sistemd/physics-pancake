<template>
  <canvas
    width="300"
    height="300"
  />
</template>

<script>
export default {
    props: {
        simulationSelection: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            requestID: null,
        };
    },
    mounted() {
        console.log('mounted');

        const frameCallback = time => {
            this.simulationSelection.activeSimulation.integrateTime(time);
            this.simulationSelection.activeSimulation.redraw();
            requestAnimationFrame(frameCallback);
        };

        requestAnimationFrame(frameCallback);
    },
};
</script>

<style>
canvas {
    width: 300px;
    height: 300px;
}
</style>
