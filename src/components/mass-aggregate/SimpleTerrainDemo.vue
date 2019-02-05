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
          <RestitutionSlider :terrainElement="platform" />
        </td>
      </tr>
      <tr>
        <td>
          <AngleSlider v-model="platformAngle" />
        </td>
      </tr>
      <tr>
        <td>
          <LengthSlider v-model="platformLength" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Demo from '../Demo';
import SimulationDisplay from '../SimulationDisplay';
import RestartButton from '../RestartButton';
import RestitutionSlider from '../RestitutionSlider';
import AngleSlider from '../AngleSlider';
import LengthSlider from '../LengthSlider';
import Line from '../../Line';
import Vector2 from '../../Vector2';
import Particle from '../../engine/mass-aggregate/Particle';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';

function startingPosition() {
    return new Vector2(0, 0.9);
}

export default {
    components: { SimulationDisplay, RestartButton, RestitutionSlider, AngleSlider, LengthSlider },
    mixins: [Demo],
    data() {
        const platformRestitution = 0.3;

        return {
            particle: new Particle({ position: startingPosition, mass: 1 }),
            platform: {
                line: new Line({ origin: new Vector2(-0.5, 0), end: new Vector2(0.5, 0) }),
                restitution: platformRestitution,
            },
            platformAngle: 0,
            platformLength: 1,
            platformRestitution,
        };
    },
    watch: {
        platformAngle() {
            this.updatePlatformLayout();
        },
        platformLength() {
            this.updatePlatformLayout();
        },
        platformRestitution() {
            this.platform.restitution = this.platformRestitution;
        },
    },
    methods: {
        createEngine(previousEngine) {
            this.particle.position = startingPosition();
            this.particle.velocity = Vector2.zero;

            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
                particles: [this.particle],
                terrain: [this.platform],
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        },
        updatePlatformLayout() {
            const lengthHalf = this.platformLength / 2;
            const end = new Vector2(
                lengthHalf * Math.cos(this.platformAngle),
                lengthHalf * Math.sin(this.platformAngle),
            );
            const origin = end.negated;
            this.platform.line = new Line({ origin, end });
        },
    },
};
</script>
