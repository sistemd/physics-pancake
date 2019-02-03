import Vector2 from '../../Vector2';

export default class Particle {
    constructor({ position, mass, gravityScale = 1 }) {
        this.position = position;
        this.gravityScale = gravityScale;
        this.force = Vector2.zero;
        this.velocity = Vector2.zero;
        this.mass = mass;
    }

    applyGravity(gravity) {
        this.force.add(new Vector2(0, -gravity * this.mass).scaled(this.gravityScale));
    }

    update(timestep, gravity, damping) {
        this.applyGravity(gravity);
        this.updateVelocity(timestep);
        this.applyDamping(damping);
        this.updatePosition(timestep);
    }

    wasStationary(timestep) {
        return this.velocity.almostEquals(this.acceleration.scaled(timestep));
    }

    get speed() {
        return this.velocity.magnitude;
    }

    applyDamping(damping) {
        this.velocity.scale(1 - damping);
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
}
