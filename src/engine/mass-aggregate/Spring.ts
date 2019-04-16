import Particle from './Particle';
import Line from '../../Line';

export default abstract class Spring {
    public restingLength: number;

    public constructor(public particles: Particle[]) {
        if (particles.length !== 2)
            throw new Error('Wrong number of particles');

        this.restingLength = this.currentLength;
    }

    public update(): void {
        this.contract(this.particles[0], this.particles[1]);
        this.contract(this.particles[1], this.particles[0]);
    }

    public abstract contract(fromParticle: Particle, toParticle: Particle): void;

    public get line(): Line {
        return new Line({
            origin: this.particles[0].position,
            end: this.particles[1].position,
        });
    }

    public get currentLength(): number {
        return this.particles[0].position.distance(this.particles[1].position);
    }

    public get lengthDelta(): number {
        return this.currentLength - this.restingLength;
    }
}
