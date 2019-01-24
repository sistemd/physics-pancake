<template>
  <div id="options-root">
    <select v-model="engineSelection">
      <option
        value="massAggregateEngine"
      >
        Mass Aggregate Engine
      </option>
      <option value="rigidBodyEngine">
        Rigid Body Engine
      </option>
    </select>

    <div
      v-if="engineSelection === 'massAggregateEngine'"
      id="mass-aggregate-options"
    >
      <label
        class="gravity"
        for="mass-aggregate-engine-gravity"
      >
        Gravity:
      </label>
      <input
        v-model="simulationSelection.massAggregateSimulation.options.gravity"
        class="gravity"
      >
    </div>
  </div>
</template>

<script>
'use strict';

// TODO Add individual children for mass aggregate options and rigid body options

export default {
    props: {
        simulationSelection: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            engineSelection: 'massAggregateEngine',
        };
    },
    watch: {
        engineSelection(newSelection) {
            this.updateActiveSimulation(newSelection);
        },
    },
    created() {
        this.updateActiveSimulation(this.engineSelection);
    },
    methods: {
        updateActiveSimulation(engineSelection) {
            if (engineSelection === 'massAggregateEngine')
                this.simulationSelection.activeSimulation = this.simulationSelection.massAggregateSimulation;
            if (engineSelection === 'rigidBodyEngine')
                this.simulationSelection.activeSimulation = this.simulationSelection.rigidBodySimulation;
        },
    },
};
</script>

<style>
#options-root {
    display: flex;
    flex-direction: column;
}

#options-root > select {
    text-align: center;
}

#options-root > div {
    justify-content: center;
    display: flex;
    margin-top: 3%;
}

#options-root > div > * {
    justify-content: center;
    text-align: center;
}

div#mass-aggregate-options > input.gravity {
    width: 8%;
    margin-left: 4%;
}
</style>
