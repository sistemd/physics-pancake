import Vector from './Vector';

export function clearContext(context, style) {
    if (style)
        context.fillStyle = style;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawCircle(context, { position, radius }, style) {
    if (style)
        context.fillStyle = style;
    context.beginPath();
    position = fromNormalizedDeviceCoordinates(position, context.canvas);
    const xRadius = context.canvas.width * radius / 2;
    const yRadius = context.canvas.height * radius / 2;
    context.ellipse(position.x, position.y, xRadius, yRadius, 0, 0, Math.PI * 2);
    context.fill();
}

export function drawLine(context, line, style) {
    if (style)
        context.strokeStyle = style;
    context.beginPath();
    const origin = fromNormalizedDeviceCoordinates(line.origin, context.canvas);
    context.moveTo(origin.x, origin.y);
    const end = fromNormalizedDeviceCoordinates(line.end, context.canvas);
    context.lineTo(end.x, end.y);
    context.stroke();
}

export function drawPolygon(context, polygon, style) {
    if (style)
        context.fillStyle = style;

    if (!polygon.edgesAreConnected)
        throw new Error('Disconnected polygon edges');

    const points = polygon.edges.map(edge => fromNormalizedDeviceCoordinates(edge.origin, context.canvas));
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1))
        context.lineTo(point.x, point.y);
    context.fill();
}

export function fromNormalizedDeviceCoordinates(coordinates, { width, height }) {
    const factor = coordinates.added(new Vector(1, 1)).scaled(0.5);
    return new Vector(
        width * factor.x,
        height * (1 - factor.y),
    );
}

export function toNormalizedDeviceCoordinates(coordinates, { width, height }) {
    const factor = new Vector(coordinates.x / width, 1 - coordinates.y / height);
    return factor.added(new Vector(-0.5, -0.5)).scaled(2);
}
