'use struct';

import MassAggregateEngine from './MassAggregateEngine';
import { clearContext, drawCircle } from '../graphics';

export default class MassAggregateSimulation {
    constructor({ drawingContext, options, ...massAggregateOptions }) {
        this.engine = new MassAggregateEngine({ options, ...massAggregateOptions });
        this.drawingContext = drawingContext;
        this.options = options;
    }

    redraw() {
        clearContext(this.drawingContext, this.options.backgroundStyle);
        if (this.options.drawParticles)
            this.drawParticles();
        if (this.options.drawSprings)
            this.drawSprings();
    }

    drawParticles() {
        for (const particle of this.engine.particles)
            drawCircle(this.drawingContext, {
                position: particle.position,
                radius: this.options.particleRadius
            }, this.options.primaryStyle);
    }

    drawSprings() {
        // TODO
    }

    integrateTime(time) {
        this.engine.integrateTime(time);
    }

    set options(value) {
        this.engine.options = value;
    }

    get options() {
        return this.engine.options;
    }
}
