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
import { min, repeatTask } from '../utils';
import SimulationDisplay from './SimulationDisplay';

const minSelectionDistance = 9e-2;

const minSelectionDistanceSquared = minSelectionDistance * minSelectionDistance;

const particleThrowMultiplier = 9e-2;

class MouseHistory {
    static get length() {
        return 10;
    }

    static get collectionDelay() {
        return 10;
    }

    constructor() {
        this.entries = [];
    }

    addPosition(mousePosition) {
        this.entries.push(mousePosition);
        if (this.entries.length > MouseHistory.length)
            this.entries = this.entries.slice(1);
    }

    averageDelta() {
        const deltas = Array.from(this.deltas());

        if (deltas.length === 0)
            return Vector.zero;

        const result = Vector.zero;
        for (const delta of deltas)
            result.add(delta);
        result.scale(1/deltas.length);
        return result;
    }

    *deltas() {
        if (this.entries.length < 2)
            return;

        for (let i = 0; i < this.entries.length - 1; ++i)
            yield this.entries[i + 1].subtracted(this.entries[i]);
    }
}

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
            lastMousePosition: Vector.zero,
            mouseHistory: new MouseHistory(),
        };
    },
    created() {
        repeatTask(() => {
            if (this.selection.particle !== undefined)
                this.mouseHistory.addPosition(this.lastMousePosition);
        }, MouseHistory.collectionDelay);
    },
    methods: {
        onMouseDown(mousePosition) {
            this.selection.particle = this.newlySelectedParticle(mousePosition);

            if (this.selection.particle === undefined)
                return;

            this.selection.particle.origin = mousePosition;
            this.selection.wasFixed = this.selection.particle.fixed;
            this.selection.particle.fixed = true;
            this.selection.particle.velocity = Vector.zero;
        },
        onMouseMove(mousePosition) {
            this.lastMousePosition = mousePosition;

            if (this.selection.particle !== undefined)
                this.selection.particle.origin = mousePosition;
        },
        updateMouseHistory() {
            this.mouseHistory.push(this.lastMousePosition);
            if (this.mouseHistory.length > mouseHistoryLength)
                this.mouseHistory = this.mouseHistory.slice(1);
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
        onMouseLeave() {
            if (this.selection.particle === undefined)
                return;
            if (!this.selection.wasFixed)
                this.selection.particle.fixed = false;
            this.selection.particle = undefined;
        },
        throwSelectedParticle() {
            const delta = this.mouseHistory.averageDelta();
            this.selection.particle.velocity = delta.scaled(particleThrowMultiplier);
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
