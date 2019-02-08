import Line from '../../Line.js';

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
            toParticle.position.subtracted(fromParticle.position).scaled(
                this.contractionMagnitude(fromParticle)));
    }

    contractionMagnitude(particle) {
        return this.stiffness * this.lengthDelta;
    }

    get line() {
        return new Line({
            origin: this.particles[0].position,
            end: this.particles[1].position,
        });
    }

    get currentLength() {
        return this.particles[0].position.distance(this.particles[1].position);
    }

    get lengthDelta() {
        return this.currentLength - this.restingLength;
    }
}
