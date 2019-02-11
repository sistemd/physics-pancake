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
import ParticleDemo from './mass-aggregate/ParticleDemo';
import SpringDemo from './mass-aggregate/SpringDemo';
import TerrainDemo from './mass-aggregate/TerrainDemo';
import ParticleCollisionDemo from './mass-aggregate/ParticleCollisionDemo';
import RodDemo from './mass-aggregate/RodDemo';
import PolygonDemo from './mass-aggregate/PolygonTestDemo';

export default {
    data() {
        return {
            demos: [
                {
                    title: 'Polygon Demo',
                    component: PolygonDemo,
                },
                {
                    title: 'Particle Demo',
                    component: ParticleDemo,
                },
                {
                    title: 'Spring Demo',
                    component: SpringDemo,
                },
                {
                    title: 'Terrain Demo',
                    component: TerrainDemo,
                },
                {
                    title: 'Particle Collision Demo',
                    component: ParticleCollisionDemo,
                },
                {
                    title: 'Rod Demo',
                    component: RodDemo,
                }
            ],
            currentDemo: undefined,
        };
    },
};
</script>
