export default class Simulation {
    constructor({ drawing, engine }) {
        this.engine = engine;
        this.drawing = drawing;
    }

    redraw() {
        this.drawing.redraw(this.engine);
    }

    integrateTime(time) {
        this.engine.integrateTime(time);
    }
}
