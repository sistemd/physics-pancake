import Line from '../../Line';

export default class Spring {
    constructor({ particles, stiffness }) {
        this.particles = particles;
        this.restingLength = this.currentLength;
        this.stiffness = stiffness;
    }

    update() {
        this.contract(this.particles[0], this.particles[1]);
        this.contract(this.particles[1], this.particles[0]);
    }

    contract(fromParticle, toParticle) {
        fromParticle.force.add(
            toParticle.position.subtracted(fromParticle.position).scaled(this.contractionMagnitude));
    }

    get contractionMagnitude() {
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
