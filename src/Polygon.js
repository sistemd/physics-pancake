import { min } from './utils';
import Line from './Line';
import Vector from './Vector';

function * vertices(edges) {

}

export default class Polygon {
    static fromVertices(vertices) {
        if (vertices.length < 3)
            throw new Error('Polygon must have at least three vertices');
        return Polygon.fromEdges(Array.from(findEdges()));

        function * findEdges() {
            for (let i = 0; i < vertices.length - 1; ++i)
                yield new Line({ origin: vertices[i].cloned, end: vertices[i + 1].cloned });
            yield new Line({ origin: vertices[vertices.length - 1].cloned, end: vertices[0].cloned });
        }
    }

    static fromEdges(edges) {
        if (edges.length < 3)
            throw new Error('Polygon must have at least three edges');
        return new Polygon(edges);
    }

    constructor(edges) {
        this.edges = edges;
    }

    get vertices() {
        return this.edges.map(edge => edge.origin);
    }

    get edgesAreConnected() {
        for (let i = 1; i < this.edges.length; ++i) {
            if (!this.edges[i].origin.almostEquals(this.edges[i - 1].end))
                return false;
        }

        if (!this.edges[0].origin.almostEquals(this.edges[this.edges.length - 1].end))
            return false;

        return true;
    }

    containsPoint(point) {
        if (this.isVertex(point))
            return true;

        const ray = new Line({ origin: point, offset: new Vector(1, 0) });
        return this.countIntersections(ray) % 2 === 1;
    }

    isVertex(point) {
        return this.vertices.some(vertex => vertex.almostEquals(point));
    }

    countIntersections(ray) {
        return this.edges.reduce((acc, edge) => {
            if (ray.rayIntersects(edge))
                return acc + 1;
            return acc;
        }, 0);
    }

    closestEdge(point) {
        return min(this.edges, edge => edge.distance(point));
    }
}
