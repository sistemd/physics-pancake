<template>
  <div>
    <SimulationDisplay :simulation="simulation" />
    <RestartButton @click="restartEngine" />
  </div>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import MassAggregateEngine from '../../mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../mass-aggregate/MassAggregateDrawing';
import Spring from '../../mass-aggregate/Spring';
import Particle from '../../mass-aggregate/Particle';
import FixedParticle from '../../mass-aggregate/FixedParticle';
import Vector2 from '../../Vector2';

export default {
    components: {
        SimulationDisplay,
        RestartButton,
    },
    mixins: [Demo],
    methods: {
        createEngine() {
            const particles = [
                new FixedParticle({
                    position: Vector2.zero,
                    mass: 1,
                }),
                new Particle({
                    position: new Vector2(-0.2, 0.2),
                    gravityScale: 2.5,
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                particles,
                springs: [
                    new Spring({ particles, stiffness: 0.99 }),
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
