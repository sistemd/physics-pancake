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

export function almostEquals(a, b, x = epsilon) {
    return Math.abs(a - b) <= x;
}
