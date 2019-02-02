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
          <GravitySlider :simulation="simulation" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Demo from '../Demo';
import GravitySlider from '../GravitySlider';
import RestartButton from '../RestartButton';
import SimulationDisplay from '../SimulationDisplay';
import Particle from '../../mass-aggregate/Particle';
import MassAggregateEngine from '../../mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../mass-aggregate/MassAggregateDrawing';
import Vector2 from '../../Vector2';

export default {
    components: {
        SimulationDisplay,
        RestartButton,
        GravitySlider,
    },
    mixins: [Demo],
    methods: {
        createEngine(previousEngine) {
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: 0,
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
