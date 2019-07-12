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
          <RestitutionSlider v-model="restitution" />
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

<script lang="js">
import Demo from '../Demo';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
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

// XXX Add a friction slider here and see if you can figure out a decent default value

function startingPosition() {
    return new Vector(0, 0.9);
}

export default {
    components: { InteractiveSimulationDisplay, RestartButton, RestitutionSlider, AngleSlider, LengthSlider },
    mixins: [Demo],
    data() {
        const restitution = 0.45;

        return {
            particle: new Particle({ origin: startingPosition(), mass: 1 }),
            platform: new TerrainElement({
                polygon: new Polygon({
                    vertices: [
                        new Vector(-0.5, -2), new Vector(0.5, -2),
                        new Vector(0.5, 0), new Vector(-0.5, 0),
                    ],
                }),
                restitution,
                friction: 1e-2,
            }),
            platformAngle: 0,
            platformLength: 1,
            restitution,
        };
    },
    watch: {
        platformAngle() {
            this.updatePlatformLayout();
        },
        platformLength() {
            this.updatePlatformLayout();
        },
        restitution() {
            for (const terrainElement of this.simulation.engine.terrain)
                terrainElement.restitution = this.restitution;
        },
    },
    methods: {
        createEngine(previousEngine) {
            this.particle.origin = startingPosition();
            this.particle.velocity = Vector.zero;

            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
                particles: [this.particle],
                terrain: [this.platform, new TerrainElement({
                    restitution: this.restitution,
                    friction: 1e-2,
                    polygon: new Polygon({
                        vertices: [
                            new Vector(0.8, -5), new Vector(4, -5),
                            new Vector(4, 5), new Vector(0.8, 5),
                        ],
                    }),
                })],
            });
        },
        createDrawing(engine) {
            return new MassAggregateDrawing({ engine });
        },
        updatePlatformLayout() {
            const lengthHalf = this.platformLength / 2;
            const x = lengthHalf * Math.cos(this.platformAngle);
            const y = lengthHalf * Math.sin(this.platformAngle);
            this.platform.polygon = new Polygon({
                vertices: [
                    new Vector(-x, -2), new Vector(x, -2),
                    new Vector(x, y), new Vector(-x, -y),
                ],
            });
            this.simulation.engine.terrain[0].polygon = this.platform.polygon;
        },
    },
};
</script>
