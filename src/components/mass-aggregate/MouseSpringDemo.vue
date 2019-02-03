<template>
  <table>
    <tr>
      <td>
        <SimulationDisplay
          :simulation="simulation"
          @mousemove="mouseMoved"
        />
      </td>
    </tr>
    <tr>
      <td>
        <RestartButton @click="restartEngine" />
      </td>
    </tr>
    <tr>
      <td>
        <StiffnessSlider :spring="spring" />
      </td>
    </tr>
  </table>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import StiffnessSlider from '../StiffnessSlider';
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
        StiffnessSlider,
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
    computed: {
        spring() {
            return this.simulation.engine.springs[0];
        },
    },
    methods: {
        createEngine(previousEngine) {
            const particles = [
                this.fixedParticle,
                new Particle({
                    position: new Vector2(-0.2, 0.2),
                    gravityScale: 2.5,
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
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
    },
};
</script>
