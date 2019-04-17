import Spring from './Spring';
import Particle from './Particle';
import Vector from '../../Vector';

export default class Rod extends Spring {
    public contract(fromParticle: Particle, toParticle: Particle) {
        if (fromParticle.fixed)
            return;
        if (toParticle.fixed)
            this.contractOne(fromParticle, toParticle);
        else
            this.contractBoth(fromParticle, toParticle);
    }

    public contractOne(fromParticle: Particle, toParticle: Particle): void {
        const direction = fromParticle.origin.direction(toParticle.origin);
        fromParticle.origin.add(direction.scaled(this.lengthDelta));
    }

    public contractBoth(fromParticle: Particle, toParticle: Particle): void {
        const direction = fromParticle.origin.direction(toParticle.origin);
        const netMass = fromParticle.mass + toParticle.mass;
        fromParticle.origin.add(direction.scaled(this.lengthDelta * toParticle.mass / netMass));
    }
}
