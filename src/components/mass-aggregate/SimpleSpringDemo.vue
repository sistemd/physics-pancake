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
      <tr>
        <td>
          <DampingSlider :simulation="simulation" />
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
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Spring from '../../engine/mass-aggregate/Spring';
import Particle from '../../engine/mass-aggregate/Particle';
import FixedParticle from '../../engine/mass-aggregate/FixedParticle';
import Vector from '../../Vector';

export default {
    components: {
        SimulationDisplay,
        RestartButton,
        GravitySlider,
        DampingSlider,
    },
    mixins: [Demo],
    methods: {
        createEngine(previousEngine) {
            const particles = [
                new FixedParticle({
                    position: Vector.zero,
                    mass: 1,
                }),
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
                    new Spring({ particles, stiffness: 0.99 }),
                ],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        },
    },
};
</script>
