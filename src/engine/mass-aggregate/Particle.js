import Engine from '../Engine';
import Vector from '../../Vector';

// XXX
// Something I'd like to add in the future is for particles
// to also have a coeffcient of restitution and take that into account
// when resolving contacts.
//
// For terrain contacts, adding the restitutions or calculating
// an average value between the particle restitution and the
// terrain restitution might work fine.
//
// For particle contacts, it's not as simple.
// See https://en.wikipedia.org/wiki/Inelastic_collision#Formula
// and also Kodicek D., Flynt J. P., Mathematics and Physics for Programmers,
// chapter on collision resolution might be interesting.

const baseRadius = 6e-3;

export default class Particle {
    constructor({ position, mass = 1, gravityScale = 1, fixedRadius = undefined, fixed = false }) {
        this.position = position;
        this.gravityScale = gravityScale;
        this.force = Vector.zero;
        this.velocity = Vector.zero;
        this.mass = mass;
        this.fixedRadius = fixedRadius;
        this.fixed = fixed;
    }

    applyGravity(gravity) {
        this.force.add(new Vector(0, -gravity * this.mass).scaled(this.gravityScale));
    }

    update(gravity, damping) {
        if (this.fixed) {
            this.velocity = Vector.zero;
            return;
        }

        this.applyGravity(gravity);
        this.updateVelocity();
        this.applyDamping(damping);
        this.updatePosition();
    }

    // XXX Test this
    overlaps(other) {
        const radiiSum = this.radius + other.radius;
        return radiiSum * radiiSum > this.position.distanceSquared(other.position);
    }

    get radius() {
        if (this.fixedRadius !== undefined)
            return this.fixedRadius;
        return baseRadius * Math.sqrt(this.mass);
    }

    get speed() {
        return this.velocity.magnitude;
    }

    get speedSquared() {
        return this.velocity.magnitudeSquared;
    }

    applyDamping(damping) {
        this.velocity.scale(Math.pow(1 - damping, Engine.timestep));
    }

    updateVelocity() {
        this.velocity.add(this.acceleration.scaled(Engine.timestep));
    }

    updatePosition() {
        this.position.add(this.velocity.scaled(Engine.timestep));
    }

    get acceleration() {
        return this.force.scaled(1 / this.mass);
    }
}
