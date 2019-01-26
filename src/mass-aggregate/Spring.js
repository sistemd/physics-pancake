import Line from '../Line.js';

export default class Spring {
    constructor({ particles, stiffness }) {
        this.particles = particles;
        this.stiffness = (stiffness !== undefined) ? stiffness : 0.99;
        this.restingLength = this.currentLength;
    }

    update(timestep) {
        this.contract(this.particles[0], this.particles[1], timestep);
        this.contract(this.particles[1], this.particles[0], timestep);
    }

    contract(fromParticle, toParticle, timestep) {
        fromParticle.force.add(
            fromParticle.position.directionTo(toParticle.position).scaled(
                this.contractionMagnitude(fromParticle, timestep)));
    }

    contractionMagnitude(particle, timestep) {
        return (particle.mass / timestep) * (this.lengthDelta / 2 / timestep - particle.speed) * this.stiffness;
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
