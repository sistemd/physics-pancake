<template>
  <table>
    <tbody>
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
      <tr>
        <td>
          <GravitySlider :engine="simulation.engine" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="js">
import Demo from '../Demo';
import GravitySlider from '../GravitySlider';
import RestartButton from '../RestartButton';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
import Particle from '../../engine/mass-aggregate/Particle';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Vector from '../../Vector';

export default {
    components: {
        InteractiveSimulationDisplay,
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
                        origin: new Vector(0, 0),
                    }),
                ],
            });
        },
        createDrawing(engine) {
            return new MassAggregateDrawing({ engine });
        },
    },
};
</script>
