/* eslint-env jest */

import Particle from '../engine/mass-aggregate/Particle';
import Vector from '../Vector';

test('Particle.overlaps', () => {
    let p1 = new Particle({ position: Vector.zero, fixedRadius: 1 });
    let p2 = new Particle({ position: new Vector(5, 5), fixedRadius: 2 });

    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();

    p1.position = new Vector(4, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p2.position = new Vector(5, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p1.position = new Vector(5, 4);
    p2.position = new Vector(8, 4);
    expect(p1.overlaps(p2)).toBeTruthy();
    expect(p2.overlaps(p1)).toBeTruthy();

    p1.position = new Vector(5, 4);
    p2.position = new Vector(9, 4);
    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();

    p1.position = new Vector(4, 4);
    p2.position = new Vector(9, 4);
    expect(p1.overlaps(p2)).toBeFalsy();
    expect(p2.overlaps(p1)).toBeFalsy();
});
