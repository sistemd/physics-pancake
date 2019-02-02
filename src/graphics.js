import Vector2 from './Vector2';

export function clearContext(context, style) {
    if (style)
        context.fillStyle = style;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawCircle(context, { position, radius }, style) {
    if (style)
        context.fillStyle = style;
    context.beginPath();
    position = fromNormalizedCoordinates(position, context.canvas);
    const xRadius = context.canvas.width * radius;
    const yRadius = context.canvas.height * radius;
    context.ellipse(position.x, position.y, xRadius, yRadius, 0, 0, Math.PI * 2);
    context.fill();
}

export function drawLine(context, line, style) {
    if (style)
        context.strokeStyle = style;
    context.beginPath();
    const origin = fromNormalizedCoordinates(line.origin, context.canvas);
    context.moveTo(origin.x, origin.y);
    const end = fromNormalizedCoordinates(line.end, context.canvas);
    context.lineTo(end.x, end.y);
    context.stroke();
}

export function fromNormalizedCoordinates(coordinates, { width, height }) {
    const factor = coordinates.addedTo(new Vector2(1, 1)).scaled(0.5);
    return new Vector2(
        width * factor.x,
        height * (1 - factor.y),
    );
}

export function toNormalizedCoordinates(coordinates, { width, height }) {
    const factor = new Vector2(coordinates.x / width, 1 - coordinates.y / height);
    return factor.addedTo(new Vector2(-0.5, -0.5)).scaled(2);
}
