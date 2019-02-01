<template>
  <canvas
    width="300"
    height="300"
    v-on="$listeners"
  />
</template>

<script>
export default {
    props: {
        simulation: {
            type: Object,
            default: null,
        },
    },
    mounted() {
        const frameCallback = time => {
            this.simulationSelection.activeSimulation.integrateTime(time);
            this.simulationSelection.activeSimulation.redraw();
            requestAnimationFrame(frameCallback);
        };

        requestAnimationFrame(frameCallback);
    },
};
</script>
