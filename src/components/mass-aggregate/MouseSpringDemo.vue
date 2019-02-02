<template>
  <div>
    <SimulationDisplay @mousemove="mouseMoved" :simulation="simulation" />
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
    data() {
        return {
            fixedParticle: new FixedParticle({
                position: Vector2.zero,
                mass: 1,
            }),
        };
    },
    methods: {
        createEngine() {
            const particles = [
                this.fixedParticle,
                new Particle({
                    position: new Vector2(-0.2, 0.2),
                    gravityScale: 2.5,
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                particles,
                springs: [
                    new Spring({ particles, stiffness: 1e-5 }),
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
        mouseMoved(position) {
            this.fixedParticle.position = position;
        },
    }
};
</script>
