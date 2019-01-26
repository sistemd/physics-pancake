import { clearContext, drawCircle, drawLine } from '../drawing';
import Line from '../Line';

const visualForceScale = 100000;

export default class MassAggregateDrawing {
    constructor({
        context, drawingForces, drawingSprings, drawingParticles,
        particleRadius, backgroundStyle, primaryStyle, secondaryStyle,
    }) {
        this.context = context;
        this.drawingForces = drawingForces;
        this.drawingSprings = drawingSprings;
        this.drawingParticles = drawingParticles;
        this.particleRadius = particleRadius;
        this.backgroundStyle = backgroundStyle;
        this.primaryStyle = primaryStyle;
        this.secondaryStyle = secondaryStyle;
    }

    clear() {
        clearContext(this.context, this.backgroundStyle);
    }

    drawForces(particles) {
        if (!this.drawingForces)
            return;

        for (const particle of particles) {
            drawLine(
                this.context,
                new Line(particle.position, particle.force.scaled(visualForceScale)),
                this.primaryStyle,
            );
        }
    }

    drawParticles(particles) {
        if (!this.drawingParticles)
            return;

        for (const particle of particles) {
            drawCircle(this.context, {
                position: particle.position,
                radius: this.particleRadius,
            }, this.secondaryStyle);
        }
    }

    drawSprings(springs) {
        if (!this.drawingSprings)
            return;

        for (const spring of springs) {
            drawLine(this.context, spring.line, this.secondaryStyle);
        }
    }
}
