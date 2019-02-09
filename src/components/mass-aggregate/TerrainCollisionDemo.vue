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
          <RestitutionSlider
            :terrainElement="platform"
            :engine="simulation.engine"
          />
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
import Polygon from '../../Polygon';
import Vector from '../../Vector';
import Particle from '../../engine/mass-aggregate/Particle';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import TerrainElement from '../../engine/mass-aggregate/TerrainElement';

function startingPosition() {
    return new Vector(0, 0.9);
}

export default {
    components: { SimulationDisplay, RestartButton, RestitutionSlider, AngleSlider, LengthSlider },
    mixins: [Demo],
    data() {
        const platformRestitution = 0.45;

        return {
            particle: new Particle({ position: startingPosition, mass: 1 }),
            platform: new TerrainElement({
                polygon: Polygon.fromVertices([
                    new Vector(-0.5, 0), new Vector(0.5, 0),
                    new Vector(0.5, -2), new Vector(-0.5, -2),
                ]),
                restitution: platformRestitution,
            }),
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
            this.platform.setRestitution(this.platformRestitution);
        },
    },
    methods: {
        createEngine(previousEngine) {
            this.particle.position = startingPosition();
            this.particle.velocity = Vector.zero;

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
            const x = lengthHalf * Math.cos(this.platformAngle);
            const y = lengthHalf * Math.sin(this.platformAngle);
            this.platform.polygon = Polygon.fromVertices([
                new Vector(-x, -y), new Vector(x, y),
                new Vector(x, -2), new Vector(-x, -2),
            ]);
            this.simulation.engine.terrain[0].polygon = this.platform.polygon;
        },
    },
};
</script>
