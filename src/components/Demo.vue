<script>
import Simulation from '../Simulation';
import NotImplemented from '../NotImplemented';

export default {
    data() {
        return {
            simulation: new Simulation({
                engine: this.createEngine(),
                drawing: this.createDrawing(),
            }),
        };
    },
    mounted() {
        this.simulation.context = document.getElementsByTag('canvas')[0].getContext('2d');
    },
    methods: {
        createEngine() {
            throw new NotImplemented();
        },
        createDrawing() {
            // The created drawing can leave its context undefined.
            // mounted() will set up the context properly.
            throw new NotImplemented();
        },
        restartEngine() {
            this.simulation.engine = this.createEngine();
        },
    }
};
</script>
