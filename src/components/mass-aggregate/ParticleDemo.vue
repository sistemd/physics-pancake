<template>
    <SimulationDisplay :simulation="simulation">
    </SimulationDisplay>
</template>

<script>

// TODO Simulation = engine + drawing
// TODO How do we handle restarting now?

export default {
    data: {
        simulation: new Simulation({
            
        }),
    },
    components: {
        SimulationDisplay,
    },
}
</script>
