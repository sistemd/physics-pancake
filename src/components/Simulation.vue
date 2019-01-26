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
// TODO Since now springs are just forces and it isn't easy to draw them,
// I'll need to be able to inject the drawing object into the simulation (or something like that),
// so simulation may need to only be a single class (don't need to separate into two classes).

import SimulationDisplay from './SimulationDisplay';
import SimulationOptions from './SimulationOptions';
import MassAggregateSimulation from '../mass-aggregate/MassAggregateSimulation';
import MassAggregateEngine from '../mass-aggregate/MassAggregateEngine';
import RigidBodySimulation from '../rigid-body/RigidBodySimulation';
import Particle from '../mass-aggregate/Particle';
import MovingParticle from '../mass-aggregate/MovingParticle';
import Spring from '../mass-aggregate/Spring';
import Vector2 from '../Vector2';

export default {
    components: { SimulationDisplay, SimulationOptions },
    data() {
        return {
            massAggregateSimulation: new MassAggregateSimulation({
                drawing: {
                    context: null,
                    drawingForces: true,
                    drawingParticles: true,
                    drawingSprings: true,
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
                    title: 'Simple Spring',
                    factory(engine) {
                        const particles = [
                            new Particle({
                                position: new Vector2(-0.1, 0),
                                mass: 1,
                            }),
                            new MovingParticle({
                                position: new Vector2(0.1, 0.1),
                                mass: 1,
                                constantForce: new Vector2(1e-7, 0),
                            }),
                        ];
                        return new MassAggregateEngine({
                            timestep: engine.timestep,
                            gravity: engine.gravity,
                            particles,
                            springs: [
                                new Spring({ particles, stiffness: 1, }),
                            ],
                        });
                    },
                },
                {
                    title: 'Simple Particle',
                    factory(engine) {
                        return new MassAggregateEngine({
                            timestep: engine.timestep,
                            gravity: engine.gravity,
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
