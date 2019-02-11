import Spring from './Spring';

export default class Rod extends Spring {
    contract(fromParticle, toParticle) {
        if (fromParticle.fixed)
            return;
        if (toParticle.fixed)
            this.contractOne(fromParticle, toParticle);
        else
            this.contractBoth(fromParticle, toParticle);
    }

    contractOne(fromParticle, toParticle) {
        const direction = fromParticle.position.direction(toParticle.position);
        fromParticle.position.add(direction.scaled(this.lengthDelta));
    }

    contractBoth(fromParticle, toParticle) {
        const direction = fromParticle.position.direction(toParticle.position);
        const netMass = fromParticle.mass + toParticle.mass;
        fromParticle.position.add(direction.scaled(this.lengthDelta * toParticle.mass / netMass));
    }
}
