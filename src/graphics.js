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
    position = transformNormalizedCoordinates(context, position);
    const xRadius = context.canvas.width * radius;
    const yRadius = context.canvas.height * radius;
    context.ellipse(position.x, position.y, xRadius, yRadius, 0, 0, Math.PI * 2);
    context.fill();
}

export function drawLine(context, line, style) {
    if (style)
        context.strokeStyle = style;
    context.beginPath();
    const origin = transformNormalizedCoordinates(context, line.origin);
    context.moveTo(origin.x, origin.y);
    const end = transformNormalizedCoordinates(context, line.end);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function transformNormalizedCoordinates(context, coordinates) {
    const factor = coordinates.addedTo(new Vector2(1, 1)).scaled(0.5);
    return new Vector2(
        context.canvas.width * factor.x,
        context.canvas.height * (1 - factor.y),
    );
}
