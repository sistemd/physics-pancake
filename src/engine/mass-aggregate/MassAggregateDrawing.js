import { clearContext, drawCircle, drawLine } from '../../graphics';
import Line from '../../Line';

const visualForceScale = 100000;

const backgroundStyle = 'white';

const particleStyle = 'green';

const springStyle = 'grey';

const terrainStyle = 'brown';

const forceStyle = 'pink';

const particleRadius = 0.005;

// XXX Will probably have a base class for drawing

export default class MassAggregateDrawing {
    constructor({
        context,
        drawingForces = false,
        drawingTerrain = true,
        drawingSprings = true,
        drawingParticles = true
    } = {}) {
        this.context = context;
        this.drawingForces = drawingForces;
        this.drawingTerrain = drawingTerrain;
        this.drawingSprings = drawingSprings;
        this.drawingParticles = drawingParticles;
    }

    redraw(engine) {
        if (!this.context)
            return;

        this.clear();
        this.drawTerrain(engine.terrain);
        this.drawParticles(engine.particles);
        this.drawSprings(engine.springs);
        this.drawForces(engine.particles);
    }

    clear() {
        clearContext(this.context, backgroundStyle);
    }

    drawTerrain(terrain) {
        if (!this.drawingTerrain)
            return;

        for (const { line } of terrain)
            drawLine(this.context, line, terrainStyle);
    }

    drawForces(particles) {
        if (!this.drawingForces)
            return;

        for (const particle of particles) {
            drawLine(
                this.context,
                new Line(particle.position, particle.force.scaled(visualForceScale)),
                forceStyle,
            );
        }
    }

    drawParticles(particles) {
        if (!this.drawingParticles)
            return;

        for (const particle of particles) {
            drawCircle(this.context, {
                position: particle.position,
                radius: particleRadius,
            }, particleStyle);
        }
    }

    drawSprings(springs) {
        if (!this.drawingSprings)
            return;

        for (const spring of springs)
            drawLine(this.context, spring.line, springStyle);
    }
}
