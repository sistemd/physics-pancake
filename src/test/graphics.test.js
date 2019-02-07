/* eslint-env jest */

import { fromNormalizedCoordinates, toNormalizedCoordinates } from '../graphics';
import Vector from '../Vector';

const coordinateConversionTests = [
    {
        dimensions: { width: 100, height: 100 },
        coordinates: [
            {
                world: new Vector(50, 50),
                normalized: new Vector(0, 0),
            },
            {
                world: new Vector(55, 45),
                normalized: new Vector(0.1, 0.1),
            },
            {
                world: new Vector(45, 55),
                normalized: new Vector(-0.1, -0.1),
            },
            {
                world: new Vector(60, 2.5),
                normalized: new Vector(0.2, 0.95),
            },
            {
                world: new Vector(60, 97.5),
                normalized: new Vector(0.2, -0.95),
            },
            {
                world: new Vector(40, 97.5),
                normalized: new Vector(-0.2, -0.95),
            },
        ]
    },
    {
        dimensions: { width: 200, height: 400 },
        coordinates: [
            {
                world: new Vector(100, 200),
                normalized: new Vector(0, 0),
            },
            {
                world: new Vector(110, 180),
                normalized: new Vector(0.1, 0.1),
            },
            {
                world: new Vector(90, 220),
                normalized: new Vector(-0.1, -0.1),
            },
            {
                world: new Vector(120, 10),
                normalized: new Vector(0.2, 0.95),
            },
            {
                world: new Vector(120, 390),
                normalized: new Vector(0.2, -0.95),
            },
            {
                world: new Vector(80, 390),
                normalized: new Vector(-0.2, -0.95),
            },
        ]
    },
];

test('graphics.fromNormalizedCoordinates and graphics.toNormalizedCoordinates', () => {
    for (const testCase of coordinateConversionTests) {
        for (const coordinates of testCase.coordinates) {
            const worldCoordinates = fromNormalizedCoordinates(coordinates.normalized, testCase.dimensions);
            const normalizedCoordinates = toNormalizedCoordinates(coordinates.world, testCase.dimensions);
            expect(worldCoordinates.almostEquals(coordinates.world)).toBeTruthy();
            expect(normalizedCoordinates.almostEquals(coordinates.normalized)).toBeTruthy();
        }
    }
});
