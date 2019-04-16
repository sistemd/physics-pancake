import { clearContext, drawCircle, drawLine, drawPolygon } from '../../graphics';
import Drawing from '../Drawing';
import Line from '../../Line';
import MassAggregateEngine from './MassAggregateEngine';

const visualForceScale = 100000;

const visualVelocityScale = 100;

const backgroundStyle = 'white';

const particleColor = {
    hue: 225,
    saturation: 70,
    lightness: 40,
};

const maxColorHue = 360;

const springStyle = 'grey';

const terrainStyle = 'rgb(155, 200, 200)';

const forceStyle = 'brown';

const velocityStyle = 'red';

interface MassAggregateDrawingParams {
    context?: CanvasRenderingContext2D;
    engine: MassAggregateEngine;
    drawingForces?: boolean;
    drawingVelocities?: boolean;
    drawingTerrain?: boolean;
    drawingSprings?: boolean;
    drawingParticles?: boolean;
}

export default class MassAggregateDrawing implements Drawing {
    public context?: CanvasRenderingContext2D;
    public engine: MassAggregateEngine;
    public drawingForces: boolean;
    public drawingVelocities: boolean;
    public drawingTerrain: boolean;
    public drawingSprings: boolean;
    public drawingParticles: boolean;

    public constructor(params: MassAggregateDrawingParams) {
        this.context = params.context;
        this.engine = params.engine;
        this.drawingForces = params.drawingForces || false;
        this.drawingVelocities = params.drawingVelocities || false;
        this.drawingTerrain = params.drawingTerrain || true;
        this.drawingSprings = params.drawingSprings || true;
        this.drawingParticles = params.drawingParticles || true;
    }

    public redraw(): void {
        this.clear();
        this.drawTerrain();
        this.drawParticles();
        this.drawSprings();
        this.drawForces();
        this.drawVelocities();
    }

    public clear(): void {
        if (this.context !== undefined) {
            clearContext(this.context, backgroundStyle);
        }
    }

    public drawTerrain(): void {
        if (!this.drawingTerrain)
            return;

        if (this.context !== undefined) {
            for (const { polygon } of this.engine.terrain)
                drawPolygon(this.context, polygon, terrainStyle);
        }
    }

    public drawForces(): void {
        if (!this.drawingForces)
            return;

        if (this.context !== undefined) {
            for (const particle of this.engine.particles) {
                drawLine(
                    this.context,
                    new Line({ origin: particle.position, offset: particle.force.scaled(visualForceScale) }),
                    forceStyle,
                );
            }
        }
    }

    public drawVelocities(): void {
        if (!this.drawingVelocities)
            return;

        if (this.context !== undefined) {
            for (const particle of this.engine.particles) {
                drawLine(
                    this.context,
                    new Line({ origin: particle.position, offset: particle.velocity.scaled(visualVelocityScale) }),
                    velocityStyle,
                );
            }
        }
    }

    public drawParticles(): void {
        if (!this.drawingParticles || this.engine.particles.length === 0)
            return;

        if (this.context !== undefined) {
            let currentHue = particleColor.hue;
            const hueStep = Math.min(
                (maxColorHue - particleColor.hue) / this.engine.particles.length,
                20,
            );

            for (const particle of this.engine.particles) {
                const style = `hsl(${currentHue}, ${particleColor.saturation}%, ${particleColor.lightness}%)`;
                drawCircle(this.context, { position: particle.position, radius: particle.radius }, style);
                currentHue -= hueStep;
            }
        }
    }

    public drawSprings(): void {
        if (!this.drawingSprings)
            return;

        if (this.context !== undefined) {
            for (const spring of this.engine.springs)
                drawLine(this.context, spring.line, springStyle);
        }
    }
}
