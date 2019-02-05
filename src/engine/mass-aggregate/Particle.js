import { almostEquals } from '../../utils';
import Vector2 from '../../Vector2';

export default class Particle {
    constructor({ position, mass, gravityScale = 1 }) {
        this.position = position;
        this.gravityScale = gravityScale;
        this.force = Vector2.zero;
        this.previousSpeedSquared = 0;
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

    get wasStationary() {
        console.log(this.previousSpeedSquared);
        return almostEquals(this.previousSpeedSquared, 0, 1e-8);
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
        this.previousSpeedSquared = this.speedSquared;
        this.velocity.add(this.acceleration.scaled(timestep));
    }

    updatePosition(timestep) {
        this.position.add(this.velocity.scaled(timestep));
    }

    get acceleration() {
        return this.force.scaled(1 / this.mass);
    }
}
