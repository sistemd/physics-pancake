<template>
  <div>
    <select v-model="currentDemo">
      <option
        v-for="demo in demos"
        :key="demo.title"
        :value="demo.component"
      >
        {{ demo.title }}
      </option>
    </select>

    <component :is="currentDemo" />
  </div>
</template>

<script>
import SimpleParticleDemo from './mass-aggregate/SimpleParticleDemo';
import SimpleSpringDemo from './mass-aggregate/SimpleSpringDemo';
import MouseSpringDemo from './mass-aggregate/MouseSpringDemo';
import SimpleTerrainDemo from './mass-aggregate/SimpleTerrainDemo';

export default {
    data() {
        return {
            demos: [
                {
                    title: 'Simple Particle Demo',
                    component: SimpleParticleDemo,
                },
                {
                    title: 'Simple Spring Demo',
                    component: SimpleSpringDemo,
                },
                {
                    title: 'Mouse Spring Demo',
                    component: MouseSpringDemo,
                },
                {
                    title: 'Simple Terrain Demo',
                    component: SimpleTerrainDemo,
                },
            ],
            currentDemo: null,
        };
    },
};
</script>
