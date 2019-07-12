import { min, almostEquals, edgesAreConnected } from './utils';
import Line from './Line';
import Vector from './Vector';
import Circle from './Circle';

function edgesFromVertices(vertices: Vector[]): Line[] {
    const edges: Line[] = [];

    for (let i = 0; i < vertices.length - 1; ++i)
        edges.push(new Line({ origin: vertices[i].cloned, end: vertices[i + 1].cloned }));
    edges.push(new Line({ origin: vertices[vertices.length - 1].cloned, end: vertices[0].cloned }));

    return edges;
}

function verticesFromEdges(edges: Line[]): Vector[] {
    return edges.map(edge => edge.origin);
}

interface PolygonParams {
    vertices?: Vector[];
    edges?: Line[];
}

export default class Polygon {
    private mVertices: Vector[];

    public get vertices(): ReadonlyArray<Vector> {
        return this.mVertices;
    }

    public constructor(params: PolygonParams) {
        const { vertices, edges } = params;

        if (vertices !== undefined && edges !== undefined)
            throw new Error('Either vertices or edges should be specified, but not both');

        if (vertices !== undefined) {
            if (vertices.length < 3)
                throw new Error('A polygon must contain at least three vertices');

            this.mVertices = vertices;
            return;
        } else if (edges !== undefined) {
            if (edges.length < 3)
                throw new Error('A polygon must contain at least three edges');
            if (!edgesAreConnected(edges))
                throw new Error('Polygon edges must be connected');
            this.mVertices = verticesFromEdges(edges);
        } else {
            throw new Error('Either vertices or edges must be specified');
        }
    }

    public get isCounterClockwise(): boolean {
        const edges = this.edges;
        let c = 0;

        for (let i = 0; i < edges.length - 1; ++i) {
            c = edges[i].offset.cross(edges[i + 1].offset);
            if (almostEquals(c, 0))
                throw new Error('Two edges are collinear');
            if (c < 0)
                return false;
        }

        c = edges[edges.length - 1].offset.cross(edges[0].offset);
        if (almostEquals(c, 0))
            throw new Error('Two edges are collinear');
        return c > 0;
    }

    public get edges(): Line[] {
        return Array.from(edgesFromVertices(this.mVertices));
    }

    public overlapsCircle(circle: Circle): boolean {
        for (const edge of this.edges) {
            if (edge.intersectsCircle(circle))
                return true;
        }

        const ray = new Line({ origin: circle.origin, offset: new Vector(1, 0) });
        return this.countIntersections(ray) % 2 === 1;
    }

    public containsPoint(point: Vector): boolean {
        if (this.isVertex(point))
            return true;

        const ray = new Line({ origin: point, offset: new Vector(1, 0) });
        return this.countIntersections(ray) % 2 === 1;
    }

    public isVertex(point: Vector): boolean {
        return this.mVertices.some(vertex => vertex.almostEquals(point));
    }

    public countIntersections(ray: Line): number {
        return this.edges.reduce((acc, edge) => {
            if (ray.intersectsRay(edge))
                return acc + 1;
            return acc;
        }, 0);
    }

    public closestEdge(point: Vector): Line {
        return min(this.edges, edge => edge.distance(point)) as Line;
    }
}
