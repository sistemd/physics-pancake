import Line from '../Line.js';

export default class Spring {
    constructor({ particles, stiffness }) {
        this.particles = particles;
        this.stiffness = (stiffness !== undefined) ? stiffness : 0.99;
        this.restingLength = this.currentLength;
    }

    get line() {
        return Line.between(this.particles[0].position, this.particles[1].position);
    }

    get currentLength() {
        return this.particles[0].distanceTo(this.particles[1]);
    }
}
