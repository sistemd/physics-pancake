<template>
    <div id="root">
        <InteractiveSimulationDisplay :simulation="simulation" />
        <RestartButton id="restart-button" @click="restartEngine" />
        <div id="remaining-ui">
            <div id="force-slider">
                <label>Force</label>
                <input v-model.number="firingForce" type="range" min="0" max="1e-3" step="1e-9" />
            </div>
            <ParticleMassSliders :particles="particles" :min="1" :max="5" />
        </div>
    </div>
</template>

<style>
div#root {
    display: flex;
    align-items: center;
}

#restart-button {
    padding-top: 3%;
    padding-bottom: 5%;
}

div#force-slider {
    display: flex;
}
</style>

<script lang="js">
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
        const firingForce = 1.3e-4;

        return {
            firingForce,
            particles: [
                new FiredParticle({
                    origin: leftParticlePosition.cloned,
                    mass: 1,
                    firingForce: new Vector(firingForce, 0),
                }),
                new FiredParticle({
                    origin: rightParticlePosition.cloned,
                    mass: 1,
                    firingForce: new Vector(-firingForce, 0),
                }),
            ],
        };
    },
    methods: {
        createEngine() {
            this.particles[0].origin = leftParticlePosition.cloned;
            this.particles[0].velocity = Vector.zero;
            this.particles[0].fired = false;
            this.particles[0].firingForce = new Vector(this.firingForce, 0);
            this.particles[1].origin = rightParticlePosition.cloned;
            this.particles[1].velocity = Vector.zero;
            this.particles[1].fired = false;
            this.particles[1].firingForce = new Vector(-this.firingForce, 0);

            return new MassAggregateEngine({
                gravity: 0,
                particles: this.particles,
            });
        },
        createDrawing(engine) {
            return new MassAggregateDrawing({ engine });
        },
    },
};
</script>
