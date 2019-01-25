<template>
  <div id="simulation-root">
    <div>
      <SimulationOptions
        :simulationSelection="$data"
        :massAggregateSamples="massAggregateSamples"
        :rigidBodySamples="rigidBodySamples"
      />
    </div>
    <div>
      <SimulationDisplay :simulationSelection="$data" />
    </div>
  </div>
</template>

<script>
import SimulationDisplay from './SimulationDisplay';
import SimulationOptions from './SimulationOptions';
import MassAggregateSimulation from '../mass-aggregate/MassAggregateSimulation';
import MassAggregateEngine from '../mass-aggregate/MassAggregateEngine';
import RigidBodySimulation from '../rigid-body/RigidBodySimulation';
import Particle from '../mass-aggregate/Particle';
import Vector2 from '../Vector2';

export default {
    components: { SimulationDisplay, SimulationOptions },
    data() {
        return {
            massAggregateSimulation: new MassAggregateSimulation({
                drawing: {
                    context: null,
                    drawParticles: true,
                    drawSprings: true,
                    particleRadius: 0.0099,
                    backgroundStyle: 'white',
                    primaryStyle: 'green',
                    secondaryStyle: 'grey',
                },
                engine: {
                    timestep: 1,
                    gravity: 1e-6,
                    particles: [],
                    springs: [],
                },
            }),
            rigidBodySimulation: new RigidBodySimulation(),
            activeSimulation: null,
        };
    },
    computed: {
        massAggregateSamples() {
            return [
                {
                    title: 'Single Particle',
                    factory(engine) {
                        return new MassAggregateEngine({
                            ...engine,
                            particles: [
                                new Particle({
                                    position: new Vector2(0, 0),
                                    mass: 0.1,
                                }),
                            ],
                            springs: [],
                        });
                    },
                },
            ];
        },
        rigidBodySamples() {
            return [];
        }
    },
    mounted() {
        const canvas = document.getElementsByTagName('canvas')[0];
        const drawingContext = canvas.getContext('2d');
        this.massAggregateSimulation.drawing.context = drawingContext;
        this.rigidBodySimulation.drawing.context = drawingContext;
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
