<script lang="js">
import Vue from 'vue';
import Simulation from '../engine/Simulation';
import NotImplemented from '../NotImplemented';

export default Vue.extend({
    data() {
        return {
            simulation: undefined,
        };
    },
    created() {
        const engine = this.createEngine({});
        this.simulation = new Simulation(engine, this.createDrawing(engine));
    },
    mounted() {
        this.simulation.drawing.context = document.getElementsByTagName('canvas')[0].getContext('2d');
    },
    methods: {
        createEngine(previousEngine) {
            throw new NotImplemented();
        },
        createDrawing(engine) {
            // The created drawing can leave its context undefined.
            // mounted() will set up the context properly.
            throw new NotImplemented();
        },
        restartEngine() {
            // XXX Ugh, what a hack
            this.simulation.drawing.engine = this.simulation.engine =
                this.createEngine(this.simulation.engine);
        },
    },
});
</script>
