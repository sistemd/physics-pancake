import { clearContext, drawCircle, drawLine } from '../graphics';

export default class MassAggregateDrawing {
    constructor({ context, drawingSprings, drawingParticles, particleRadius, backgroundStyle, primaryStyle, secondaryStyle }) {
        this.context = context;
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

    drawParticles(particles) {
        for (const particle of particles) {
            drawCircle(this.context, {
                position: particle.position,
                radius: this.particleRadius,
            }, this.secondaryStyle);
        }
    }

    drawSprings(springs) {
        for (const spring of springs)
            drawLine(this.context, spring.line, this.secondaryStyle);
    }
}
