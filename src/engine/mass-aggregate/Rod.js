import Spring from './Spring';

export default class Rod extends Spring {
    contract(fromParticle, toParticle) {
        const direction = fromParticle.position.direction(toParticle.position);
        const netMass = fromParticle.mass + toParticle.mass;
        fromParticle.position.add(direction.scaled(this.lengthDelta * toParticle.mass / netMass));
    }
}
