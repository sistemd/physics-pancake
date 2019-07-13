<template>
    <div id="root">
        <InteractiveSimulationDisplay :simulation="simulation" />
        <RestartButton id="restart-button" @click="restartEngine" />
        <GravitySlider :engine="simulation.engine" />
    </div>
</template>

<style>
div#root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#restart-button {
    padding-top: 3%;
}
</style>

<script lang="js">
import Demo from '../Demo';
import GravitySlider from '../GravitySlider';
import RestartButton from '../RestartButton';
import InteractiveSimulationDisplay from '../InteractiveSimulationDisplay';
import Particle from '../../engine/mass-aggregate/Particle';
import MassAggregateEngine from '../../engine/mass-aggregate/MassAggregateEngine';
import MassAggregateDrawing from '../../engine/mass-aggregate/MassAggregateDrawing';
import Vector from '../../Vector';

export default {
    components: {
        InteractiveSimulationDisplay,
        RestartButton,
        GravitySlider,
    },
    mixins: [Demo],
    methods: {
        createEngine(previousEngine) {
            return new MassAggregateEngine({
                gravity: previousEngine.gravity,
                damping: 0,
                particles: [
                    new Particle({
                        origin: new Vector(0, 0),
                    }),
                ],
            });
        },
        createDrawing(engine) {
            return new MassAggregateDrawing({ engine });
        },
    },
};
</script>
