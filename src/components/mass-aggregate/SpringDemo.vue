<template>
    <div id="root">
        <InteractiveSimulationDisplay :simulation="simulation" />
        <RestartButton id="restart-button" @click="restartEngine" />
        <StiffnessSlider v-model="stiffness" />
    </div>
</template>

<style>
div#root {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script lang="js">
import Demo from '../Demo';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
import RestartButton from '../RestartButton';
import StiffnessSlider from '../StiffnessSlider';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import ElasticSpring from '../../engine/mass-aggregate/ElasticSpring';
import Particle from '../../engine/mass-aggregate/Particle';
import Vector from '../../Vector';

export default {
    components: {
        InteractiveSimulationDisplay,
        RestartButton,
        StiffnessSlider,
    },
    mixins: [Demo],
    data() {
        return {
            stiffness: 1e-5,
        };
    },
    watch: {
        stiffness(newStiffness) {
            this.simulation.engine.springs[0].stiffness = newStiffness;
        },
    },
    methods: {
        createEngine(previousEngine) {
            const particles = [
                new Particle({
                    origin: Vector.zero,
                    mass: 1,
                    fixed: true,
                }),
                new Particle({
                    origin: new Vector(-0.2, 0.2),
                    gravityScale: 2.5,
                    mass: 1,
                }),
            ];
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: previousEngine.damping,
                particles,
                springs: [
                    new ElasticSpring({ particles, stiffness: this.stiffness }),
                ],
            });
        },
        createDrawing(engine) {
            return new MassAggregateDrawing({ engine });
        },
    },
};
</script>
