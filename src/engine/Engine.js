import NotImplemented from '../NotImplemented';

// Trying to integrate more than maxTimeDelta milliseconds at a time
// simply drops the integration and does nothing. Serves to fix lag.
const maxTimeDelta = 3000;

export default class Engine {
    static get timestep() {
        return 6;
    }

    constructor() {
        this.timeAccumulator = 0;
        this.lastIntegrationTime = undefined;
    }

    integrateTime(currentTime) {
        if (this.lastIntegrationTime === undefined) {
            this.lastIntegrationTime = currentTime;
            return;
        }

        const timeDelta = currentTime - this.lastIntegrationTime;
        this.lastIntegrationTime = currentTime;
        if (timeDelta > maxTimeDelta)
            return;
        this.timeAccumulator += timeDelta;
        while (this.timeAccumulator >= Engine.timestep) {
            this.timeAccumulator -= Engine.timestep;
            this.integrateStep();
        }
    }

    integrateStep() {
        throw new NotImplemented();
    }
}
