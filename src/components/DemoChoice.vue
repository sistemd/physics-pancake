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

    <component class="demo" :is="currentDemo" />
  </div>
</template>

<script>
import ParticleDemo from './mass-aggregate/ParticleDemo';
import SpringDemo from './mass-aggregate/SpringDemo';

export default {
    data() {
        return {
            demos: [
                {
                    title: 'Particle Demo',
                    component: ParticleDemo,
                },
                {
                    title: 'SpringDemo',
                    component: SpringDemo,
                },
            ],
            currentDemo: null,
        };
    },
};
</script>
