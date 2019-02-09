import { clearContext, drawCircle, drawLine, drawPolygon } from '../../graphics';
import Line from '../../Line';

const visualForceScale = 100000;

const backgroundStyle = 'white';

const particleColor = {
    hue: 225,
    saturation: 70,
    lightness:  40,
};

const maxColorLightness = 100;

const springStyle = 'grey';

const terrainStyle = 'rgb(155, 200, 200)';

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
        if (!this.drawingParticles || particles.length === 0)
            return;

        let currentLightness = particleColor.lightness;
        const lightnessStep = Math.min(
            (maxColorLightness - particleColor.lightness) / particles.length,
            25,
        );

        for (const particle of particles) {
            const style = `hsl(${particleColor.hue}, ${particleColor.saturation}%, ${currentLightness}%)`;
            drawCircle(this.context, { position: particle.position, radius: particle.radius }, style);
            currentLightness -= lightnessStep;
        }
    }

    drawSprings(springs) {
        if (!this.drawingSprings)
            return;

        for (const spring of springs)
            drawLine(this.context, spring.line, springStyle);
    }
}
