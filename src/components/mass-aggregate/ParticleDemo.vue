<template>
  <div>
    <RestartButton @click="restartEngine" />
    <SimulationDisplay :simulation="simulation" />
  </div>
</template>

<script>
import Demo from '../Demo';
import RestartButton from '../RestartButton';
import SimulationDisplay from '../SimulationDisplay';
import Particle from '../../mass-aggregate/Particle';
import MassAggregateEngine from '../../mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../mass-aggregate/MassAggregateDrawing';
import Vector2 from '../../Vector2';

export default {
    components: {
        RestartButton,
        SimulationDisplay,
    },
    mixins: [Demo],
    methods: {
        createEngine() {
            return new MassAggregateEngine({
                particles: [
                    new Particle({
                        position: new Vector2(0, 0),
                        mass: 0.1,
                    }),
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing({
                context: undefined,
                drawingParticles: true,
                drawingSprings: true,
                drawingForces: false,
            });
        },
    },
};
</script>
