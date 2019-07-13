/* eslint-env jest */

import Vector from '../Vector';
import {circlesOverlap} from '../Circle';

test('Particle.overlaps', () => {
    const c1 = { origin: Vector.zero, radius: 1 };
    const c2 = { origin: new Vector(5, 5), radius: 2 };

    expect(circlesOverlap(c1, c2)).toBeFalsy();
    expect(circlesOverlap(c2, c1)).toBeFalsy();

    c1.origin = new Vector(4, 4);
    expect(circlesOverlap(c1, c2)).toBeTruthy();
    expect(circlesOverlap(c2, c1)).toBeTruthy();

    c2.origin = new Vector(5, 4);
    expect(circlesOverlap(c1, c2)).toBeTruthy();
    expect(circlesOverlap(c2, c1)).toBeTruthy();

    c1.origin = new Vector(5, 4);
    c2.origin = new Vector(8, 4);
    expect(circlesOverlap(c1, c2)).toBeTruthy();
    expect(circlesOverlap(c2, c1)).toBeTruthy();

    c1.origin = new Vector(5, 4);
    c2.origin = new Vector(9, 4);
    expect(circlesOverlap(c1, c2)).toBeFalsy();
    expect(circlesOverlap(c2, c1)).toBeFalsy();

    c1.origin = new Vector(4, 4);
    c2.origin = new Vector(9, 4);
    expect(circlesOverlap(c1, c2)).toBeFalsy();
    expect(circlesOverlap(c2, c1)).toBeFalsy();
});
