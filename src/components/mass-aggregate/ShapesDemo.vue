<template>
  <table>
    <tr>
      <td>
        <InteractiveSimulationDisplay :simulation="simulation" />
      </td>
    </tr>
    <tr>
      <td>
        <RestartButton @click="restartEngine" />
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import Demo from '../Demo';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
import RestartButton from '../RestartButton';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Particle from '../../engine/mass-aggregate/Particle';
import Rod from '../../engine/mass-aggregate/Rod';
import ElasticSpring from '../../engine/mass-aggregate/ElasticSpring';
import TerrainElement from '../../engine/mass-aggregate/TerrainElement';
import Vector from '../../Vector';
import Polygon from '../../Polygon';

export default {
    components: {
        InteractiveSimulationDisplay,
        RestartButton,
    },
    mixins: [Demo],
    methods: {
        createEngine(previousEngine) {
            const particles = [
                new Particle({ position: new Vector(-0.1, 0.1) }),
                new Particle({ position: new Vector(0.1, 0.1) }),
                new Particle({ position: new Vector(0.1, -0.1) }),
                new Particle({ position: new Vector(-0.1, -0.1) }),
            ];
            const terrain = [
                new TerrainElement({
                    polygon: new Polygon({ vertices: [
                        new Vector(-1, -1), new Vector(1, -1),
                        new Vector(1, -0.5), new Vector(-1, -0.5),
                    ] }),
                }),
            ];
            const springs = [
                new ElasticSpring({ particles: [particles[0], particles[1]], stiffness: 1e-3 }),
                new ElasticSpring({ particles: [particles[1], particles[2]], stiffness: 1e-3 }),
                new ElasticSpring({ particles: [particles[2], particles[3]], stiffness: 1e-3 }),
                new ElasticSpring({ particles: [particles[3], particles[0]], stiffness: 1e-3 }),
                new ElasticSpring({ particles: [particles[0], particles[2]], stiffness: 1e-3 }),
                new ElasticSpring({ particles: [particles[1], particles[3]], stiffness: 1e-3 }),
            ];
            return new MassAggregateEngine({ particles, terrain, springs });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        }
    },
};
</script>
