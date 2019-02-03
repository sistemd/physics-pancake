import Particle from './Particle';

export default class MovingParticle extends Particle {
    constructor({ position, mass, constantForce }) {
        super({ position, mass });
        this.constantForce = constantForce;
    }

    update(timestep) {
        this.force.add(this.constantForce);
        super.update(timestep);
    }
}
