<template>
  <div id="simulation-root">
    <div>
      <SimulationOptions />
    </div>
    <div>
      <SimulationDisplay />
    </div>
  </div>
</template>

<script>
'use strict';

import SimulationDisplay from './SimulationDisplay';
import SimulationOptions from './SimulationOptions';

export default {
    components: { SimulationDisplay, SimulationOptions }
};
</script>

<style>
#simulation-root {
    display: flex;
}

#simulation-root > div {
    background-color: red;
    margin-right: 2%;
}
</style>
