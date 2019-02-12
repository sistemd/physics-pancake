export const epsilon = 1e-5;

export function min(sequence, key = x => x) {
    let result;
    let minKey;

    for (const elem of sequence) {
        const k = key(elem);
        if (k === undefined)
            continue;
        if (result === undefined || minKey === undefined || k < minKey) {
            result = elem;
            minKey = k;
        }
    }

    return result;
}

export function max(sequence, key = x => x) {
    let result;
    let maxKey;

    for (const elem of sequence) {
        const k = key(elem);
        if (k === undefined)
            continue;
        if (result === undefined || maxKey === undefined || k > maxKey) {
            result = elem;
            maxKey = k;
        }
    }

    return result;
}

export function almostEquals(a, b, x = epsilon) {
    return Math.abs(a - b) <= x;
}

export function valueIsBetween({ value, limits }) {
    const minLimit = Math.min(...limits);
    const maxLimit = Math.max(...limits);
    return minLimit <= value && value <= maxLimit;
}

export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function sameSigns(a, b) {
    return (a > 0 && b > 0) || (a < 0 && b < 0);
}
