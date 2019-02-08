<template>
<table>
    <tbody>
        <tr v-for="(particle, index) in particles">
            <label>Particle {{ index }} mass:</label>
            <input type="range" :min="min" :max="max" step="1e-9" v-model="particle.mass">
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        particles: Array,
        min: Number,
        max: Number,
    },
};
</script>
