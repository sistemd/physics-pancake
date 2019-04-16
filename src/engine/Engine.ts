// Trying to integrate more than maxTimeDelta milliseconds at a time
// simply drops the integration and does nothing. Serves to fix lag.
const maxTimeDelta = 3000;

export default abstract class Engine {
    public static get timestep(): number {
        return 6;
    }

    public timeAccumulator: number = 0;
    public lastIntegrationTime?: number = undefined;

    public integrateTime(currentTime: number): void {
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

    public abstract integrateStep(): void;
}
