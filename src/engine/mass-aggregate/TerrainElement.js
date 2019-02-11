export default class TerrainElement {
    constructor({ polygon, restitution = 0, friction = 0 }) {
        this.polygon = polygon;
        this.restitution = restitution;
        this.friction = friction;
    }
}
