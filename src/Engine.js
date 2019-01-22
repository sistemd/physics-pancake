export default class Engine {
    constructor(timestep) {
        this.timestep = timestep;
        this.timeAccumulator = 0;
        this.lastIntegrationTime = null;
    }

    integrateTime(currentTime) {
        if (this.lastIntgrationTime === null) {
            this.lastIntegrationTime = currentTime;
            return;
        }

        this.timeAccumulator += currentTime - this.lastIntegrationTime;
        this.lastIntegrationTime = currentTime;
        while (this.timeAccumulator >= self.timestep) {
            this.timeAccumulator -= this.timestep;
            this.integrateStep();
        }
    }

    integrateStep() {
    }
}
