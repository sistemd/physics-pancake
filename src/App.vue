<template>
  <Simulation />
</template>

<script>
'use strict';

import Simulation from './components/Simulation';
import MassAggregateEngine from './mass-aggregate-engine/MassAggregateEngine';
import Particle from './mass-aggregate-engine/Particle';

export default {
    components: { Simulation },

    data() {
        const timestep = 1;
        const gravity = 10;

        return {
            massAggregateEngine: new MassAggregateEngine({
                timestep,
                gravity,
                particles: [
                    new Particle({
                        position: new Vector2(0, 0),
                        mass: 100,
                    }),
                ],
                springs: [],
            }),
            rigidBodyEngine: null,
        };
    },
};
</script>
