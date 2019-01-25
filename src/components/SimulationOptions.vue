<template>
  <div id="options-root">
    <select v-model="engineSelection">
      <option value="massAggregateEngine">
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
      <div>
        <select>
          <option
            v-for="sample in massAggregateSamples"
            :key="sample.title"
            @click="currentSample = sample"
          >
            {{ sample.title }}
          </option>
        </select>
        <button
          id="restart-simulation"
          @click="restartSimulation()"
        >
          Restart
        </button>
      </div>

      <div class="gravity">
        <div>
          <label
            class="gravity"
            for="mass-aggregate-gravity"
          >
            Gravity:
          </label>
        </div>
        <div class="gravity-slider">
          <input
            id="mass-aggregate-gravity"
            v-model="simulationSelection.massAggregateSimulation.engine.gravity"
            type="range"
            min="0"
            max="1e-5"
            step="1e-9"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO Add individual children for mass aggregate options and rigid body options

export default {
    props: {
        simulationSelection: {
            type: Object,
            default: null,
        },
        massAggregateSamples: {
            type: Array,
            default: null,
        },
        rigidBodySamples: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            engineSelection: 'massAggregateEngine',
            currentSample: null,
        };
    },
    watch: {
        engineSelection(newSelection) {
            this.updateActiveSimulation(newSelection);
        },
        currentSample() {
            this.restartSimulation();
        }
    },
    created() {
        this.updateActiveSimulation(this.engineSelection);
        this.currentSample = this.massAggregateSamples[0];
    },
    methods: {
        updateActiveSimulation(engineSelection) {
            if (engineSelection === 'massAggregateEngine')
                this.simulationSelection.activeSimulation = this.simulationSelection.massAggregateSimulation;
            if (engineSelection === 'rigidBodyEngine')
                this.simulationSelection.activeSimulation = this.simulationSelection.rigidBodySimulation;
        },
        restartSimulation() {
            this.simulationSelection.massAggregateSimulation.engine = this.currentSample.factory(
                this.simulationSelection.massAggregateSimulation.engine);
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
}

button#restart-simulation {
    margin-left: 3%;
}

div.gravity {
    display: flex
}

div.gravity-slider {
    margin-top: 0%;
}

#options-root > div > div {
    margin-top: 3%;
}

#options-root > div > * {
    justify-content: center;
    text-align: center;
}

div#mass-aggregate-options {
    display: flex;
    flex-direction: column;
}

div#mass-aggregate-options > input.gravity {
    width: 8%;
    margin-left: 4%;
}
</style>
