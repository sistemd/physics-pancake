import { min } from './utils';
import Line from './Line';
import Vector from './Vector';

function * edges(vertices) {
    for (let i = 0; i < vertices.length - 1; ++i) {
        yield new Line({
            origin: vertices[i].cloned,
            end: vertices[i + 1].cloned,
        });
    }

    yield new Line({
        origin: vertices[vertices.length - 1].cloned,
        end: vertices[0].cloned,
    });
}

export default class Polygon {
    static fromVertices(vertices) {
        if (vertices.length < 3)
            throw new Error('Polygon must have at least three vertices');
        return Polygon.fromEdges(Array.from(edges(vertices)));
    }

    static fromEdges(edges) {
        if (edges.length < 3)
            throw new Error('Polygon must have at least three edges');
        return new Polygon(edges);
    }

    constructor(edges) {
        this.edges = edges;
    }

    edgesAreConnected() {
        for (let i = 1; i < this.edges.length; ++i) {
            if (!this.edges[i].origin.almostEquals(this.edges[i - 1].end))
                return false;
        }

        if (!this.edges[0].origin.almostEquals(this.edges[this.edges.length - 1].end))
            return false;

        return true;
    }

    // If point is on a vertex, this method returns false.
    // If point is on a line or somewhere inside the polygon, this works as expected.
    containsPoint(point) {
        const ray = new Line({ origin: point, offset: new Vector(1, 0) });
        return this.countIntersections(ray) % 2 === 1;
    }

    countIntersections(ray) {
        return this.edges.reduce((acc, edge) => {
            if (ray.rayIntersects(edge))
                return acc + 1;
            return acc;
        }, 0);
    }

    closestEdge(point) {
        return min(this.edges, edge => edge.distanceToPoint(point));
    }
}
