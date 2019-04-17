import Vector from './Vector';
import Line from './Line';
import Polygon from './Polygon';
import Circle from './Circle';

type Context = CanvasRenderingContext2D;

export function clearContext(context: Context, style: string): void {
    if (style)
        context.fillStyle = style;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawCircle(context: Context, circle: Circle, style: string): void {
    if (style)
        context.fillStyle = style;
    context.beginPath();
    const position = fromNormalizedDeviceCoordinates(circle.origin, context.canvas);
    const xRadius = context.canvas.width * circle.radius / 2;
    const yRadius = context.canvas.height * circle.radius / 2;
    context.ellipse(position.x, position.y, xRadius, yRadius, 0, 0, Math.PI * 2);
    context.fill();
}

export function drawLine(context: Context, line: Line, style: string): void {
    if (style)
        context.strokeStyle = style;
    context.beginPath();
    const origin = fromNormalizedDeviceCoordinates(line.origin, context.canvas);
    context.moveTo(origin.x, origin.y);
    const end = fromNormalizedDeviceCoordinates(line.end, context.canvas);
    context.lineTo(end.x, end.y);
    context.stroke();
}

export function drawPolygon(context: Context, polygon: Polygon, style: string): void {
    if (style)
        context.fillStyle = style;

    const points = polygon.edges.map(edge => fromNormalizedDeviceCoordinates(edge.origin, context.canvas));
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1))
        context.lineTo(point.x, point.y);
    context.fill();
}

interface Dimensions {
    width: number;
    height: number;
}

export function fromNormalizedDeviceCoordinates(coordinates: Vector, dimensions: Dimensions): Vector {
    const factor = coordinates.added(new Vector(1, 1)).scaled(0.5);
    return new Vector(
        dimensions.width * factor.x,
        dimensions.height * (1 - factor.y),
    );
}

export function toNormalizedDeviceCoordinates(coordinates: Vector, dimensions: Dimensions): Vector {
    const factor = new Vector(coordinates.x / dimensions.width, 1 - coordinates.y / dimensions.height);
    return factor.added(new Vector(-0.5, -0.5)).scaled(2);
}
