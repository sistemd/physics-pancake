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
          <label>Force</label>
          <input
            v-model="firingForce"
            type="range"
            min="1e-4"
            max="4e-3"
            step="1e-9"
          >
        </td>
      </tr>
      <tr>
        <td>
          <ParticleMassSliders
            :particles="particles"
            :min="1"
            :max="5"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Demo from '../Demo';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
import RestartButton from '../RestartButton';
import ParticleMassSliders from '../ParticleMassSliders';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Particle from '../../engine/mass-aggregate/Particle';
import Vector from '../../Vector';

const leftParticlePosition = new Vector(-0.5, 0);

const rightParticlePosition = new Vector(0.5, 0);

class FiredParticle extends Particle {
    constructor({ firingForce, ...params }) {
        super(params);
        this.firingForce = firingForce;
        this.fired = false;
    }

    updateVelocity(timestep) {
        if (!this.fired) {
            this.fired = true;
            this.force.add(this.firingForce);
        }

        super.updateVelocity(timestep);
    }
}

export default {
    components: { InteractiveSimulationDisplay, RestartButton, ParticleMassSliders },
    mixins: [Demo],
    data() {
        const firingForce = 8.3e-4;

        return {
            firingForce,
            particles: [
                new FiredParticle({
                    position: leftParticlePosition.cloned,
                    mass: 1,
                    firingForce: new Vector(firingForce, 0),
                }),
                new FiredParticle({
                    position: rightParticlePosition.cloned,
                    mass: 1,
                    firingForce: new Vector(-firingForce, 0),
                }),
            ],
        };
    },
    methods: {
        createEngine() {
            // XXX Better way to do this

            this.particles[0].position = leftParticlePosition.cloned;
            this.particles[0].velocity = Vector.zero;
            this.particles[0].fired = false;
            this.particles[0].firingForce = new Vector(this.firingForce, 0);
            this.particles[1].position = rightParticlePosition.cloned;
            this.particles[1].velocity = Vector.zero;
            this.particles[1].fired = false;
            this.particles[1].firingForce = new Vector(-this.firingForce, 0);

            return new MassAggregateEngine({
                gravity: 0,
                particles: this.particles,
            });
        },
        createDrawing() {
            return new MassAggregateDrawing();
        },
    },
};
</script>
