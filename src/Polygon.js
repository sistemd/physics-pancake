import Line from './Line';
import Vector2 from './Vector2';

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
        return Polygon.fromEgdes(Array.from(edges(vertices)));
    }

    static fromEgdes(edges) {
        if (edges.length < 3)
            throw new Error('Polygon must have at least three edges');
        return new Polygon(edges);
    }

    constructor(edges) {
        this.edges = edges;
    }

    containsPoint(p) {

    }

    closestLine(p) {

    }
}
