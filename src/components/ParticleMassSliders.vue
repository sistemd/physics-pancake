<template>
  <table>
    <tbody>
      <tr
        v-for="(particle, index) in particles"
        :key="index"
      >
        <label :for="'mass-input' + index">
          Particle {{ index }} mass
        </label>
        <input
          :id="'mass-input' + index"
          v-model.number="particle.mass"
          type="range"
          :min="min"
          :max="max"
          step="1e-9"
        >
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
    props: {
        particles: Array,
        min: Number,
        max: Number,
    },
};
</script>
