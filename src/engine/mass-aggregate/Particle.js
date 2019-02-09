import { epsilon } from '../../utils';
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

export default class Particle {
    constructor({ position, mass, gravityScale = 1, radius = 6e-3 }) {
        this.position = position;
        this.gravityScale = gravityScale;
        this.force = Vector.zero;
        this.velocity = Vector.zero;
        this.mass = mass;
        this.radius = radius;
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
        return radiusSquared >= this.position.distanceSquared(other.position) - epsilon;
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
