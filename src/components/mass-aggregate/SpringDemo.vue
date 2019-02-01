<template>
  <div>
    <RestartButton @click="restartSimulation" />
    <SimulationDisplay :simulation="simulation" />
  </div>
</template>

<script>
import Demo from '../Demo';
import RestartButton from '../RestartButton';
import SimulationDisplay from '../SimulationDisplay';
import MassAggregateEngine from '../../mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../mass-aggregate/MassAggregateDrawing';
import Spring from '../../mass-aggregate/Spring';
import Particle from '../../mass-aggregate/Particle';
import MovingParticle from '../../mass-aggregate/MovingParticle';
import Vector2 from '../../Vector2';

export default {
    components: {
        RestartButton,
        SimulationDisplay,
    },
    mixins: [Demo],
    methods: {
        createEngine() {
            const particles = [
                new Particle({
                    position: new Vector2(-0.1, 0),
                    mass: 1,
                }),
                new MovingParticle({
                    // XXX This should be a FixedParticle with position being
                    // set to mouse position clamped from -1 to 1
                    position: new Vector2(0.1, 0.1),
                    mass: 1,
                    constantForce: new Vector2(1e-7, 0),
                }),
            ];
            return new MassAggregateEngine({
                particles,
                springs: [
                    new Spring({ particles, stiffness: 1, }),
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing({
                context: undefined,
                drawParticles: true,
                drawSprings: true,
                drawForces: false,
            });
        },
    },
};
</script>
