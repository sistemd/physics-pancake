/* eslint-env jest */

import Polygon from '../Polygon';
import Vector from '../Vector';
import Line from '../Line';

test('Polygon.edges', () => {
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

    expect(() => new Polygon({ vertices: [Vector.zero] })).toThrow();
    expect(() => new Polygon({ vertices: [Vector.zero, Vector.zero] })).toThrow();

    for (const { vertices, edges } of tests) {
        const polygon = new Polygon({ vertices });
        expect(polygon.edges).toEqual(edges);
    }
});

test('Polygon.containsPoint', () => {
    const testCases = [
        {
            polygon: new Polygon({ vertices: [Vector.zero, new Vector(2, 0), new Vector(2, 5)] }),
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
        {
            polygon: new Polygon({ vertices: [new Vector(-0.8, 0.8), new Vector(0.8, 0.8), new Vector(0, -0.8)] }),
            innerPoints: [
                {
                    point: new Vector(0.09534935573218895, -0.5203028966643934),
                    closestEdges: [new Line({ origin: new Vector(0.8, 0.8), end: new Vector(0, -0.8) })],
                },
                {
                    point: new Vector(-0.6362647941798485, 0.7933822353366304),
                    closestEdges: [new Line({ origin: new Vector(-0.8, 0.8), end: new Vector(0.8, 0.8) })],
                },
                {
                    point: new Vector(0.08678005586659565, 0.7846325542152781),
                    closestEdges: [new Line({ origin: new Vector(-0.8, 0.8), end: new Vector(0.8, 0.8) })],
                },
                {
                    point: new Vector(0.45230862833231367, 0.15588471403180493),
                    closestEdges: [new Line({ origin: new Vector(0.8, 0.8), end: new Vector(0, -0.8) })]
                },
                {
                    point: new Vector(-0.5298157111105166, 0.36197345923967017),
                    closestEdges: [new Line({ origin: new Vector(0, -0.8), end: new Vector(-0.8, 0.8) })],
                },
                {
                    point: new Vector(0.07273588857521762, -0.3468562911495727),
                    closestEdges: [new Line({ origin: new Vector(0.8, 0.8), end: new Vector(0, -0.8) })],
                },
            ],
            outerPoints: [
                new Vector(-0.9865162598485082, -0.4274854332282385),
                new Vector(0.20643739033344266, 0.9161476385333429),
                new Vector(0.895309124143729, 0.6775310584845435),
                new Vector(-0.569599271579202, -0.2601343847730464),
            ],
        },
        {
            polygon: new Polygon({ vertices: [
                Vector.zero,
                new Vector(0.6, -0.4),
                new Vector(0.6, 0.6),
                new Vector(0, 0.2),
                new Vector(-0.6, 0.6),
                new Vector(-0.6, -0.4),
            ] }),
            innerPoints: [
                {
                    point: new Vector(-0.37141273347684667, 0.10805850093574154),
                    closestEdges: [new Line({ origin: new Vector(-0.6, 0.6), end: new Vector(-0.6, -0.4) })],
                },
                {
                    point: new Vector(-0.3605734524413142, 0.3988213189368244),
                    closestEdges: [new Line({ origin: new Vector(0, 0.2), end: new Vector(-0.6, 0.6) })],
                },
                {
                    point: new Vector(-0.05173443103177511, 0.21069513329324052),
                    closestEdges: [new Line({ origin: new Vector(0, 0.2), end: new Vector(-0.6, 0.6) })],
                },
                {
                    point: new Vector(0.16985893762700033, 0.010439474135209403),
                    closestEdges: [new Line({ origin: new Vector(0, 0), end: new Vector(0.6, -0.4) })],
                },
                {
                    point: new Vector(-0.29414393134220984, -0.10308041295599257),
                    closestEdges: [new Line({ origin: new Vector(-0.6, -0.4), end: new Vector(0, 0) })],
                },
                {
                    point: new Vector(-0.5615914243378577, 0.4304573038784658),
                    closestEdges: [new Line({ origin: new Vector(-0.6, 0.6), end: new Vector(-0.6, -0.4) })],
                },
                {
                    point: new Vector(0.5791442903163639, 0.010226880052997656),
                    closestEdges: [new Line({ origin: new Vector(0.6, -0.4), end: new Vector(0.6, 0.6) })],
                }
            ],
            outerPoints: [
                new Vector(-0.8173454503571289, -0.8945639642260763),
                new Vector(0.3000825627074748, 0.45341289301181),
                new Vector(0.24242316196470748, -0.22060572170889903),
                new Vector(-0.8367190150857267, -0.40203290274162806),
                new Vector(0.10502466457120208, -0.31260994499398254),
                new Vector(-0.689271108918063, 0.7693101926122949),
            ],
        }
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
