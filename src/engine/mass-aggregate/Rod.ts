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
        const direction = fromParticle.position.direction(toParticle.position);
        fromParticle.position.add(direction.scaled(this.lengthDelta));
    }

    public contractBoth(fromParticle: Particle, toParticle: Particle): void {
        const direction = fromParticle.position.direction(toParticle.position);
        const netMass = fromParticle.mass + toParticle.mass;
        fromParticle.position.add(direction.scaled(this.lengthDelta * toParticle.mass / netMass));
    }
}
