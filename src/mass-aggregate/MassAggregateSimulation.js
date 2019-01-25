import MassAggregateEngine from './MassAggregateEngine';
import MassAggregateDrawing from './MassAggregateDrawing';

export default class MassAggregateSimulation {
    constructor({ drawing, engine }) {
        this.engine = new MassAggregateEngine(engine);
        this.drawing = new MassAggregateDrawing(drawing);
    }

    redraw() {
        this.drawing.clear();
        this.drawing.drawParticles(this.engine.particles);
        this.drawing.drawSprings(this.engine.springs);
    }

    integrateTime(time) {
        this.engine.integrateTime(time);
    }
}
