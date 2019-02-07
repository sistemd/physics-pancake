import { epsilon } from '../../utils';
import Vector from '../../Vector';

export default class Particle {
    constructor({ position, mass, gravityScale = 1 }) {
        this.position = position;
        this.gravityScale = gravityScale;
        this.force = Vector.zero;
        this.velocity = Vector.zero;
        this.mass = mass;
    }

    applyGravity(gravity) {
        this.force.add(new Vector(0, -gravity * this.mass).scaled(this.gravityScale));
    }

    update(timestep, gravity, damping) {
        this.applyGravity(gravity);
        this.updateVelocity(timestep);
        this.applyDamping(damping);
        this.updatePosition(timestep);
    }

    touches(other) {
        const radiusSquared = Math.max(this.speedSquared, other.speedSquared);
        return radiusSquared < this.position.distanceSquared(other.position) + epsilon;
    }

    get speed() {
        return this.velocity.magnitude;
    }

    get speedSquared() {
        return this.velocity.magnitudeSquared;
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
