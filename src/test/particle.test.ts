/* eslint-env jest */

import Particle from '../engine/mass-aggregate/Particle';
import Vector from '../Vector';

test('Particle.overlaps', () => {
    const p1 = new Particle({ origin: Vector.zero, fixedRadius: 1 });
    const p2 = new Particle({ origin: new Vector(5, 5), fixedRadius: 2 });

    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();

    p1.origin = new Vector(4, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p2.origin = new Vector(5, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p1.origin = new Vector(5, 4);
    p2.origin = new Vector(8, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p1.origin = new Vector(5, 4);
    p2.origin = new Vector(9, 4);
    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();

    p1.origin = new Vector(4, 4);
    p2.origin = new Vector(9, 4);
    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();
});
