import Line from '../Line.js';

export default class Spring {
    constructor({ particles, stiffness }) {
        this.particles = particles;
        this.stiffness = stiffness;
        this.restingLength = this.currentLength;
    }

    update() {
        this.contract(this.particles[0], this.particles[1]);
        this.contract(this.particles[1], this.particles[0]);
    }

    contract(fromParticle, toParticle) {
        fromParticle.force.add(
            fromParticle.position.directionTo(toParticle.position).scaled(
                this.contractionMagnitude(fromParticle)));
    }

    contractionMagnitude(particle) {
        return this.stiffness * this.lengthDelta;
    }

    get line() {
        return Line.between(this.particles[0].position, this.particles[1].position);
    }

    get currentLength() {
        return this.particles[0].position.distanceTo(this.particles[1].position);
    }

    get lengthDelta() {
        return this.currentLength - this.restingLength;
    }
}
