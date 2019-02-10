<template>
  <SimulationDisplay
    :simulation="simulation"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mousedown="onMouseDown"
    @mouseleave="onMouseLeave"
  />
</template>

<script>
import Vector from '../Vector';
import { min } from '../utils';
import SimulationDisplay from './SimulationDisplay';

const minSelectionDistance = 4e-2;

const minSelectionDistanceSquared = minSelectionDistance * minSelectionDistance;

const particleThrowMultiplier = 10;

export default {
    components: { SimulationDisplay },
    props: {
        simulation: Object,
    },
    data() {
        return {
            selection: {
                particle: undefined,
                wasFixed: undefined,
            },
            previousPosition: undefined,
        };
    },
    methods: {
        onMouseMove(mousePosition) {
            if (this.selection.particle === undefined)
                return;

            this.selection.particle.velocity = Vector.zero;
            this.selection.particle.position = mousePosition;
            if (this.previousPosition === undefined || !this.previousPosition.almostEquals(mousePosition))
                this.previousPosition = mousePosition;
        },
        onMouseUp(mousePosition) {
            if (this.selection.particle === undefined)
                return;

            if (!this.selection.wasFixed) {
                this.selection.particle.fixed = false;
                this.throwSelectedParticle(mousePosition);
            }

            this.selection.particle = undefined;
        },
        onMouseDown(mousePosition) {
            this.selection.particle = this.newlySelectedParticle(mousePosition);

            if (this.selection.particle === undefined)
                return;

            this.selection.wasFixed = this.selection.particle.fixed;
            this.selection.particle.fixed = true;
        },
        onMouseLeave() {
            if (this.selection.particle === undefined)
                return;
            if (!this.selection.wasFixed)
                this.selection.particle.fixed = false;
            this.selection.particle = undefined;
        },
        throwSelectedParticle(mousePosition) {
            if (this.previousPosition === undefined)
                return;

            const delta = mousePosition.subtracted(this.previousPosition);
            this.selection.particle.velocity = delta.scaled(particleThrowMultiplier);
        },
        newlySelectedParticle(mousePosition) {
            return min(this.simulation.engine.particles,
                particle => {
                    const selectionDistance = particle.position.distanceSquared(mousePosition);
                    if (selectionDistance > minSelectionDistanceSquared)
                        return undefined;
                    return selectionDistance;
                },
            );
        },
    },
};
</script>
