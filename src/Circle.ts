import Vector from './Vector';

export default interface Circle {
    origin: Vector;
    radius: number;
}

export function circlesOverlap(c1: Circle, c2: Circle): boolean {
    const radiiSum = c1.radius + c2.radius;
    return radiiSum * radiiSum >= c1.origin.distanceSquared(c2.origin);
}
