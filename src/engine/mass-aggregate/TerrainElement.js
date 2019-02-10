export default class TerrainElement {
    constructor({ polygon, restitution, friction }) {
        this.polygon = polygon;
        this.restitution = restitution;
        this.friction = friction;
    }
}
