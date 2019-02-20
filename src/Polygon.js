import { min, almostEquals, edgesAreConnected } from './utils';
import Line from './Line';
import Vector from './Vector';

function * edgesFromVertices(vertices) {
    for (let i = 0; i < vertices.length - 1; ++i)
        yield new Line({ origin: vertices[i].cloned, end: vertices[i + 1].cloned });
    yield new Line({ origin: vertices[vertices.length - 1].cloned, end: vertices[0].cloned });
}

function verticesFromEdges(edges) {
    return edges.map(edge => edge.origin);
}

// XXX toString

export default class Polygon {
    constructor({ vertices, edges }) {
        if (vertices === undefined && edges === undefined)
            throw new Error('Either vertices or edges must be specified');
        if (vertices !== undefined && edges !== undefined)
            throw new Error('Either vertices or edges should be specified, but not both');

        if (vertices !== undefined) {
            if (vertices.length < 3)
                throw new Error('A polygon must contain at least three vertices');

            this.vertices = vertices;
            return;
        }

        if (edges.length < 3)
            throw new Error('A polygon must contain at least three edges');
        if (!edgesAreConnected(edges))
            throw new Error('Polygon edges must be connected');
        this.vertices = verticesFromEdges(edges);
    }

    get isCounterClockwise() {
        const edges = this.edges;

        for (let i = 0; i < edges.length - 1; ++i) {
            const c = edges[i].offset.cross(edges[i + 1].offset);
            if (almostEquals(c, 0))
                throw new Error('Two edges are collinear');
            if (c < 0)
                return false;
        }

        const c = edges[edges.length - 1].offset.cross(edges[0].offset);
        if (almostEquals(c, 0))
            throw new Error('Two edges are collinear');
        return c > 0;
    }

    get edges() {
        return Array.from(edgesFromVertices(this.vertices));
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
