/* eslint-env jest */

import Polygon from '../Polygon';
import Vector2 from '../Vector2';
import Line from '../Line';

test('Polygon.fromVertices', () => {
    const tests = [
        {
            vertices: [
                Vector2.zero,
                new Vector2(1, 0),
                new Vector2(1, 1),
            ],
            edges: [
                new Line({ origin: Vector2.zero, end: new Vector2(1, 0) }),
                new Line({ origin: new Vector2(1, 0), end: new Vector2(1, 1) }),
                new Line({ origin: new Vector2(1, 1), end: Vector2.zero }),
            ],
        },
    ];

    expect(() => Polygon.fromVertices([Vector2.zero])).toThrow();
    expect(() => Polygon.fromVertices([Vector2.zero, Vector2.zero])).toThrow();

    for (const { vertices, edges } of tests) {
        const polygon = Polygon.fromVertices(vertices);
        expect(polygon.edges).toEqual(edges);
    }
});

test('Polygon.containsPoint', () => {

});

test('Polygon.closestLine', () => {

});
