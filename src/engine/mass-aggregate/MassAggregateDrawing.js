import { clearContext, drawCircle, drawLine, drawPolygon } from '../../graphics';
import Line from '../../Line';

const visualForceScale = 100000;

const backgroundStyle = 'white';

const particleStyle = 'blue';

const springStyle = 'grey';

const terrainStyle = 'brown';

const forceStyle = 'pink';

// XXX Have a base class for drawing

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

        for (const { polygon } of terrain)
            drawPolygon(this.context, polygon, terrainStyle);
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
                radius: particle.radius,
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
