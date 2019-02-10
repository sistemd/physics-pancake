<template>
  <table>
    <tbody>
      <tr>
        <td>
          <SimulationDisplay :simulation="simulation" />
        </td>
      </tr>
      <tr>
        <td>
          <RestartButton @click="restartEngine" />
        </td>
      </tr>
      <tr>
        <td>
          <GravitySlider :engine="simulation.engine" />
        </td>
      </tr>
      <tr>
        <td>
          <DampingSlider :engine="simulation.engine" />
        </td>
      </tr>
      <tr>
        <td>
          <StiffnessSlider
            v-model="stiffness"
            :spring="simulation.engine.springs[0]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import GravitySlider from '../GravitySlider';
import DampingSlider from '../DampingSlider';
import StiffnessSlider from '../StiffnessSlider';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Spring from '../../engine/mass-aggregate/Spring';
import Particle from '../../engine/mass-aggregate/Particle';
import Vector from '../../Vector';

// XXX Remove this and use interactive displays everywhere

export default {
    components: {
        SimulationDisplay,
        RestartButton,
        GravitySlider,
        DampingSlider,
        StiffnessSlider,
    },
    mixins: [Demo],
    data() {
        return {
            stiffness: 1e-5,
        };
    },
    watch: {
        stiffness(newStiffness) {
            this.simulation.engine.springs[0].stiffness = newStiffness;
        }
    },
    methods: {
        createEngine(previousEngine) {
            const particles = [
                new Particle({
                    position: new Vector(0, 0.75),
                    mass: 1,
                    fixed: true,
                }),
                new Particle({
                    position: new Vector(-0.3, 0.75),
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                gravity: previousEngine.gravity || 6e-6,
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
    },
};
</script>
