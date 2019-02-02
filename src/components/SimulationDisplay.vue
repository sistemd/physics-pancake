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
            this.simulation.integrateTime(time);
            this.simulation.redraw();
            requestAnimationFrame(frameCallback);
        };

        requestAnimationFrame(frameCallback);
    },
};
</script>
