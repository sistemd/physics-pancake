<template>
  <Simulation />
</template>

<script>
// TODO I would also like to stop using shit like simulation.integrateTime and just do simulation.engine.integrateTime
// TODO Add a restart button
// TODO Add a sample system, where you would pass an array of sample names and a factory functions
// TODO to SimulationDisplay and then generate a drop down list from those
// TODO The factory function takes some options for the engine and creates some on its own
// TODO Have gravity be a slider
// TODO Rename Simulation -> SimulationView or something
import Simulation from './components/Simulation';

export default {
    components: { Simulation },
};
</script>
