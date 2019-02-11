/* eslint-env jest */

import Polygon from '../Polygon';
import Vector from '../Vector';
import Line from '../Line';

test('Polygon.edgesAreConnected', () => {
    const connectedPolygons = [
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ]),
    ];

    const disconnectedPolygons = [
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 22) }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 22), end: new Vector(1, 1) }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
        ]),
        Polygon.fromEdges([
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
        ]),
    ];

    for (const connectedPolygon of connectedPolygons)
        expect(connectedPolygon.edgesAreConnected).toBeTruthy();

    for (const disconnectedPolygon of disconnectedPolygons)
        expect(disconnectedPolygon.edgesAreConnected).toBeFalsy();
});

test('Polygon.fromVertices', () => {
    const tests = [
        {
            vertices: [
                Vector.zero,
                new Vector(1, 0),
                new Vector(1, 1),
            ],
            edges: [
                new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
                new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
                new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            ],
        },
        {
            vertices: [
                Vector.zero,
                new Vector(2, 2),
                new Vector(1, 0),
                new Vector(1, 1),
            ],
            edges: [
                new Line({ origin: Vector.zero, end: new Vector(2, 2) }),
                new Line({ origin: new Vector(2, 2), end: new Vector(1, 0) }),
                new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
                new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            ],
        },
    ];

    expect(() => Polygon.fromVertices([Vector.zero])).toThrow();
    expect(() => Polygon.fromVertices([Vector.zero, Vector.zero])).toThrow();

    for (const { vertices, edges } of tests) {
        const polygon = Polygon.fromVertices(vertices);
        expect(polygon.edges).toEqual(edges);
        expect(polygon.edgesAreConnected).toBeTruthy();
    }
});

test('Polygon.containsPoint', () => {
    const testCases = [
        {
            polygon: Polygon.fromVertices([Vector.zero, new Vector(2, 0), new Vector(2, 5)]),
            innerPoints: [
                { point: Vector.zero },
                { point: new Vector(2, 0) },
                { point: new Vector(2, 5) },
                {
                    point: new Vector(1.5, 1.5),
                    closestEdges: [new Line({ origin: new Vector(2, 0), end: new Vector(2, 5) })],
                },
                {
                    point: new Vector(1, 1),
                    closestEdges: [new Line({ origin: new Vector(2, 5), end: Vector.zero })],
                },
                {
                    point: new Vector(1.5, 0.5),
                    closestEdges: [
                        new Line({ origin: Vector.zero, end: new Vector(2, 0) }),
                        new Line({ origin: new Vector(2, 0), end: new Vector(2, 5) }),
                    ],
                },
                {
                    point: new Vector(1, 2),
                    closestEdges: [new Line({ origin: new Vector(2, 5), end: Vector.zero })],
                },
                {
                    point: new Vector(1.1, 2),
                    closestEdges: [new Line({ origin: new Vector(2, 5), end: Vector.zero })],
                },
                {
                    point: new Vector(1.1, 1.9),
                    closestEdges: [new Line({ origin: new Vector(2, 5), end: Vector.zero })],
                },
                {
                    point: new Vector(1, 0),
                    closestEdges: [new Line({ origin: Vector.zero, end: new Vector(2, 0) })],
                },
                {
                    point: new Vector(1.5, 0),
                    closestEdges: [new Line({ origin: Vector.zero, end: new Vector(2, 0) })],
                },
                {
                    point: new Vector(2, 4),
                    closestEdges: [new Line({ origin: new Vector(2, 0), end: new Vector(2, 5) })],
                },
                {
                    point: new Vector(2, 3),
                    closestEdges: [new Line({ origin: new Vector(2, 0), end: new Vector(2, 5) })],
                },
                {
                    point: new Vector(2, 1.5),
                    closestEdges: [new Line({ origin: new Vector(2, 0), end: new Vector(2, 5) })],
                },
            ],
            outerPoints: [
                new Vector(1, 3),
                new Vector(1, 4),
                new Vector(0.5, 3),
                new Vector(0, 1),
                new Vector(2.1, 5.1),
                new Vector(-1, -1),
                new Vector(100, 100),
            ],
        },
        // TODO Also test for a random polygon
        // Could have a code generator thing for this, or not
    ];

    for (const { polygon, innerPoints, outerPoints } of testCases) {
        for (const { point, closestEdges } of innerPoints) {
            expect(polygon.containsPoint(point)).toBeTruthy();
            if (closestEdges !== undefined) {
                const expectedEdge = polygon.closestEdge(point);
                expect(closestEdges.some(edge => edge.almostEquals(expectedEdge))).toBeTruthy();
            }
        }

        for (const outerPoint of outerPoints)
            expect(polygon.containsPoint(outerPoint)).toBeFalsy();
    }
});
