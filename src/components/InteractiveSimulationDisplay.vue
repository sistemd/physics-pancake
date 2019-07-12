<template>
  <SimulationDisplay
    :simulation="simulation"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mousedown="onMouseDown"
    @mouseleave="onMouseLeave"
  />
</template>

<script lang="js">
import Vector from '../Vector';
import { min } from '../utils';
import SimulationDisplay from './SimulationDisplay';
import ElasticSpring from '../engine/mass-aggregate/ElasticSpring';
import Particle from '../engine/mass-aggregate/Particle';

const minSelectionDistance = 8e-2;

const minSelectionDistanceSquared = minSelectionDistance * minSelectionDistance;

const particleThrowMultiplier = 5e-2;

const mouseSpringStiffness = 1e-3;

export default {
    components: { SimulationDisplay },
    props: {
        simulation: Object,
    },
    data() {
        return {
            particleSelected: false,
            mouseSpring: undefined,
        };
    },
    methods: {
        simulateMouseSpring() {
            this.simulation.engine.springs.push(this.mouseSpring);
        },
        stopSimulatingMouseSpring() {
            this.simulation.engine.springs = this.simulation.engine.springs.filter(spring => spring !== this.mouseSpring);
        },
        onMouseDown(mousePosition) {
            if (this.particleSelected)
                return;

            const particle = this.newlySelectedParticle(mousePosition);

            if (particle === undefined)
                return;

            this.particleSelected = true;

            if (this.mouseSpring === undefined) {
                this.mouseSpring = new ElasticSpring({
                    particles: [new Particle({origin: mousePosition, fixed: true}), particle],
                    stiffness: mouseSpringStiffness,
                });
                // this.simulation.drawing.hiddenObjects.push(this.mouseSpring.particles[0]);
                // this.simulation.drawing.hiddenObjects.push(this.mouseSpring);
            } else {
                this.mouseSpring.particles[0].origin = mousePosition;
                this.mouseSpring.particles[1] = particle;
                this.mouseSpring.particles[1].velocity = Vector.zero;
            }

            this.mouseSpring.restingLength = 1e-5;
            this.simulateMouseSpring();
        },
        onMouseMove(mousePosition) {
            if (!this.particleSelected)
                return;

            this.mouseSpring.particles[0].origin = mousePosition;
        },
        onMouseUp() {
            if (!this.particleSelected)
                return;

            this.particleSelected = false;
            this.stopSimulatingMouseSpring();
        },
        onMouseLeave() {
            this.onMouseUp();
        },
        newlySelectedParticle(mousePosition) {
            return min(this.simulation.engine.particles,
                particle => {
                    const selectionDistance = particle.origin.distanceSquared(mousePosition);
                    if (selectionDistance > minSelectionDistanceSquared)
                        return undefined;
                    return selectionDistance;
                },
            );
        },
    },
};
</script>
