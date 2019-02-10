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
        <StiffnessSlider :stiffness="stiffness" />
      </td>
    </tr>
  </table>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import StiffnessSlider from '../StiffnessSlider';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Spring from '../../engine/mass-aggregate/Spring';
import Particle from '../../engine/mass-aggregate/Particle';
import FixedParticle from '../../engine/mass-aggregate/FixedParticle';
import Vector from '../../Vector';

// XXX When I make particles dragable by default, I won't need to save
// fixedParticle on data() here

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
                position: Vector.zero,
                mass: 1,
            }),
            stiffness: 1e-5,
        };
    },
    watch: {
        stiffness(newStiffness) {
            this.simulation.engine.springs[0].stiffness = newStiffness;
        },
    },
    methods: {
        createEngine(previousEngine) {
            const particles = [
                this.fixedParticle,
                new Particle({
                    position: new Vector(-0.2, 0.2),
                    gravityScale: 2.5,
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
                particles,
                springs: [
                    new Spring({ particles, stiffness: this.stiffness }),
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        },
        mouseMoved(position) {
            this.fixedParticle.position = position;
        },
    },
};
</script>
