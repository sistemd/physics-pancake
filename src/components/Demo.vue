<script lang="ts">
import Simulation from '../engine/Simulation';
import NotImplemented from './NotImplemented';

export default {
    data() {
        return {
            simulation: undefined,
        };
    },
    created() {
        this.simulation = new Simulation({
            engine: this.createEngine({}),
            drawing: this.createDrawing(),
        });
    },
    mounted() {
        this.simulation.drawing.context = document.getElementsByTagName('canvas')[0].getContext('2d');
    },
    methods: {
        createEngine(previousEngine) {
            throw new NotImplemented();
        },
        createDrawing() {
            // The created drawing can leave its context undefined.
            // mounted() will set up the context properly.
            throw new NotImplemented();
        },
        restartEngine() {
            this.simulation.engine = this.createEngine(this.simulation.engine);
        },
    }
};
</script>
