import Line from '../../Line';
import NotImplemented from '../../NotImplemented';

export default class Spring {
    constructor(particles) {
        this.particles = particles;
        this.restingLength = this.currentLength;
    }

    update() {
        this.contract(this.particles[0], this.particles[1]);
        this.contract(this.particles[1], this.particles[0]);
    }

    contract(fromParticle, toParticle) {
        throw new NotImplemented();
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
