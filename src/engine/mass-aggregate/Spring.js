import Line from '../../Line';
import MassAggregateEngine from './MassAggregateEngine';

export default class Spring {
    constructor({ particles, stiffness, timestep }) {
        this.particles = particles;
        this.restingLength = this.currentLength;
        this.stiffness = undefined;

        this.setStiffness(stiffness, timestep);
    }

    setStiffness(stiffness, timestep = MassAggregateEngine.defaultTimestep) {
        this.stiffness = Math.pow(stiffness, timestep);
    }

    // Used mostly in the UI so that the user can see stiffness independent of timestep
    humanReadableStiffness(timestep = MassAggregateEngine.defaultTimestep) {
        return Math.pow(this.stiffness, 1/timestep);
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
