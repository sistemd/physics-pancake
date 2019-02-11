import NotImplemented from '../NotImplemented';

// XXX Perhaps in the future I should make it so that the engine (and the simulation) can be paused
// During the pause, lastIntegrationTime gets updated, but timeAccumulator doesn't

export default class Engine {
    static get timestep() {
        return 6;
    }

    constructor() {
        this.timeAccumulator = 0;
        this.lastIntegrationTime = null;
    }

    integrateTime(currentTime) {
        if (this.lastIntegrationTime === null) {
            this.lastIntegrationTime = currentTime;
            return;
        }

        this.timeAccumulator += currentTime - this.lastIntegrationTime;
        this.lastIntegrationTime = currentTime;
        while (this.timeAccumulator >= Engine.timestep) {
            this.timeAccumulator -= Engine.timestep;
            this.integrateStep();
        }
    }

    integrateStep() {
        throw new NotImplemented();
    }
}
