import Vector2 from '../Vector2';

export default class Particle {
    constructor({ position, mass }) {
        this.position = position;
        this.forces = [];
        this.force = Vector2.zero;
        this.velocity = Vector2.zero;
        this.mass = mass;
    }

    accumulateForce() {
        return this.forces.reduce(
            (accumulator, force) => accumulator.addedTo(force(this)),
            Vector2.zero,
        );
    }

    accumulateAcceleration() {
        return this.accumulateForce().scaled(1 / this.mass);
    }

    get positionIsValid() {
        return (this.position.x >= -2 && this.position.x <= 2 &&
                this.position.y >= -2 && this.position.y <= 2);
    }
}
