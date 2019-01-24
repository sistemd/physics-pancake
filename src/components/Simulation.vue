<template>
  <div id="simulation-root">
    <div>
      <SimulationOptions :simulationSelection="$data" />
    </div>
    <div>
      <SimulationDisplay :simulationSelection="$data" />
    </div>
  </div>
</template>

<script>
'use strict';

import SimulationDisplay from './SimulationDisplay';
import SimulationOptions from './SimulationOptions';
import MassAggregateSimulation from '../mass-aggregate/MassAggregateSimulation';
import RigidBodySimulation from '../rigid-body/RigidBodySimulation';
import Particle from '../mass-aggregate/Particle';
import Vector2 from '../Vector2';

export default {
    components: { SimulationDisplay, SimulationOptions },
    data() {
        return {
            massAggregateSimulation: new MassAggregateSimulation({
                drawingContext: null,
                timestep: 1,
                options: {
                    gravity: 1e-6,
                    drawParticles: true,
                    drawSprings: true,
                    particleRadius: 0.0099,
                    backgroundStyle: 'white',
                    primaryStyle: 'green',
                    secondaryStyle: 'grey',
                },
                particles: [
                    new Particle({
                        position: new Vector2(0, 0),
                        mass: 0.1,
                    }),
                ],
                springs: [],
            }),
            rigidBodySimulation: new RigidBodySimulation(),
            activeSimulation: null,
        };
    },
    mounted() {
        const canvas = document.getElementsByTagName('canvas')[0];
        const drawingContext = canvas.getContext('2d');
        this.massAggregateSimulation.drawingContext = drawingContext;
        this.rigidBodySimulation.drawingContext = drawingContext;
    },
};
</script>

<style>
#simulation-root {
    display: flex;
}

#simulation-root > div {
    outline: 1px dashed;
    margin-right: 2%;
    justify-content: center;
}
</style>
