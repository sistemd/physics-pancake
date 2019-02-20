export default class TerrainElement {
    constructor({ polygon, restitution = 0, friction = 0 }) {
        if (!polygon.isCounterClockwise)
            throw new Error('Polygon must be in counter-clockwise order');

        this.polygon = polygon;
        this.restitution = restitution;
        this.friction = friction;
    }
}
