import Spring from './Spring';
import Particle from './Particle';

interface ElasticSpringParams {
    particles: Particle[];
    stiffness: number;
}

export default class ElasticSpring extends Spring {
    public stiffness: number;

    public constructor(params: ElasticSpringParams) {
        super(params.particles);
        this.stiffness = params.stiffness;
    }

    public contract(fromParticle: Particle, toParticle: Particle): void {
        const direction = fromParticle.position.direction(toParticle.position);
        fromParticle.force.add(direction.scaled(this.contractionMagnitude));
    }

    public get contractionMagnitude(): number {
        return this.stiffness * this.lengthDelta;
    }
}
