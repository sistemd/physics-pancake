/* eslint-env jest */

import { min, almostEquals, edgesAreConnected } from '../utils';
import Line from '../Line';
import Vector from '../Vector';

test('utils.min', () => {
    expect(min([2, 1, 4, 10])).toBe(1);
    expect(min([20, 200, 4, 10, 0.001])).toBe(0.001);
    expect(min([2, 1, 4, -10], x => x * x)).toBe(1);
    expect(min([20, 200, 4, 10, 0.001], x => -x)).toBe(200);
    expect(min(['Hello', 'world', 'coffe', 'tea'], x => x.length)).toEqual('tea');
    expect(min([])).toBeUndefined();
    expect(min([20, 200, 4, 10, 0.001], x => undefined)).toBeUndefined();
    expect(min(['Hello', 'world', 'coffe', 'tea'], x => undefined)).toBeUndefined();
});

test('utils.almostEquals', () => {
    expect(almostEquals(0.1, 0.1)).toBeTruthy();
    expect(almostEquals(55, 55)).toBeTruthy();

    expect(almostEquals(-0.1, 0.2)).toBeFalsy();
    expect(almostEquals(0.1, -0.1)).toBeFalsy();
    expect(almostEquals(55, -55)).toBeFalsy();
});

test('edgesAreConnected', () => {
    const connectedEdges = [
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
        ],
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ],
    ];

    const disconnectedEdges = [
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
        ],
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 22) }),
        ],
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 22), end: new Vector(1, 1) }),
        ],
        [
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ],
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
        ],
        [
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
        ],
        [
            new Line({ origin: new Vector(0, 1), end: Vector.zero }),
            new Line({ origin: new Vector(1, 0), end: new Vector(1, 1) }),
            new Line({ origin: new Vector(1, 1), end: new Vector(0, 1) }),
            new Line({ origin: Vector.zero, end: new Vector(1, 0) }),
        ],
    ];

    for (const edges of connectedEdges)
        expect(edgesAreConnected(edges)).toBeTruthy();

    for (const edges of disconnectedEdges)
        expect(edgesAreConnected(edges)).toBeFalsy();
});
