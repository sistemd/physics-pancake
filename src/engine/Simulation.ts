import Drawing from './Drawing';
import Engine from './Engine';

// XXX This thing is a bit weird because I need engine == drawing.engine, not sure what to do about that

export default class Simulation {
    public constructor(public engine: Engine, public drawing: Drawing) {
    }

    public redraw(): void {
        this.drawing.redraw();
    }

    public integrateTime(time: number): void {
        this.engine.integrateTime(time);
    }
}
