import Polygon from '../../Polygon';

interface TerrainElementParams {
    polygon: Polygon;
    restitution?: number;
    friction?: number;
}

export default class TerrainElement {
    public polygon: Polygon;
    public restitution: number;
    public friction: number;

    public constructor(params: TerrainElementParams) {
        if (!params.polygon.isCounterClockwise)
            throw new Error('Polygon must be in counter-clockwise order');

        this.polygon = params.polygon;
        this.restitution = params.restitution || 0;
        this.friction = params.friction || 0;
    }
}
