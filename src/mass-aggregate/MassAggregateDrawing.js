import { clearContext, drawCircle } from '../graphics';

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

    redraw() {
        if (this.drawingParticles)
            this.drawParticles();
        if (this.drawingSprings)
            this.drawSprings();
    }

    clear() {
        clearContext(this.context, this.backgroundStyle);
    }

    drawParticles(particles) {
        for (const particle of particles)
            drawCircle(this.context, {
                position: particle.position,
                radius: this.particleRadius,
            }, this.primaryStyle);
    }

    drawSprings(springs) {
        // TODO
    }
}
