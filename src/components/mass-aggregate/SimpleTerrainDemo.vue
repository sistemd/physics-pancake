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
    </tbody>
  </table>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import Line from '../../Line';
import Vector2 from '../../Vector2';
import Particle from '../../engine/mass-aggregate/Particle';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';

export default {
    components: { SimulationDisplay, RestartButton },
    mixins: [Demo],
    methods: {
        createEngine(previousEngine) {
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
                particles: [
                    new Particle({ position: Vector2.zero, mass: 1 }),
                ],
                terrain: [
                    {
                        line: new Line({ origin: new Vector2(-0.5, 0), end: new Vector2(0.5, 0) }),
                        restitution: 0.1,
                    },
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        },
    },
};
</script>
