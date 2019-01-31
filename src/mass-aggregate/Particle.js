import Vector2 from '../Vector2';

export default class Particle {
    constructor({ position, mass }) {
        this.position = position;
        this.force = Vector2.zero;
        this.velocity = Vector2.zero;
        this.mass = mass;
    }

    applyGravity(gravity) {
        this.force.add(new Vector2(0, -gravity * this.mass));
    }

    update(timestep) {
        this.updateVelocity(timestep);
        this.updatePosition(timestep);
    }

    wasStationary(timestep) {
        return this.velocity.almostEquals(this.acceleration.scaled(timestep));
    }

    get speed() {
        return this.velocity.magnitude;
    }

    updateVelocity(timestep) {
        this.velocity.add(this.acceleration.scaled(timestep));
    }

    updatePosition(timestep) {
        this.position.add(this.velocity.scaled(timestep));
    }

    get acceleration() {
        return this.force.scaled(1 / this.mass);
    }

    get positionIsValid() {
        return (this.position.x >= -2 && this.position.x <= 2 &&
                this.position.y >= -2 && this.position.y <= 2);
    }
}
