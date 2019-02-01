<script>
import SimulationDisplay from './SimulationDisplay';
import MassAggregateParticleDemo from './mass-aggregate/ParticleDemo';
import MassAggregateSpringDemo from './mass-aggergate/SpringDemo'

export default {
    data() {
        return {
            demos: [
                {
                    title: 'Mass Aggregate Particle Demo',
                    component: MassAggregateParticleDemo,
                },
                {
                    title: 'Mass Aggregate Spring Demo',
                    component: MassAggregateSpringDemo,
                },
            ],
        };
    },
    render(h) {
        return h(
            'div',
            [
                h('SimulationChoice', {
                    on: {
                        choice(newDemo) {
                            this.currentDemo = newDemo;
                        }
                    },
                    props: {
                        demos: this.demos,
                    },
                }),
                h(this.currentDemo.component),
            ]
        );
    },
};
</script>
