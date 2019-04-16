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
import Rod from '../../engine/mass-aggregate/Rod';
import Particle from '../../engine/mass-aggregate/Particle';
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
        createEngine() {
            const particles = [
                new Particle({ position: new Vector(0, 0.8) }),
                new Particle({ position: new Vector(-0.35, 0.5) }),
            ];
            return new MassAggregateEngine({
                particles,
                springs: [
                    new Rod(particles)
                ],
                terrain: [
                    new TerrainElement({
                        polygon: new Polygon({
                            vertices: [
                                new Vector(5, -5), new Vector(5, 5),
                                new Vector(0.7, 5), new Vector(0.7, -5),
                            ],
                        }),
                        restitution: 0.3,
                    }),
                    new TerrainElement({
                        polygon: new Polygon({
                            vertices: [
                                new Vector(0.8, 0), new Vector(-5, 0),
                                new Vector(-5, -5), new Vector(0.8, -5),
                            ],
                        }),
                        restitution: 0.3,
                    }),
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        }
    },
};
</script>
