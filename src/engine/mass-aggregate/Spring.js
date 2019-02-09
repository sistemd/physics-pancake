import Line from '../../Line';

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
        const direction = fromParticle.position.direction(toParticle.position);
        fromParticle.force.add(direction.scaled(this.contractionMagnitude));
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
