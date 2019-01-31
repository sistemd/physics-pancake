export function min(sequence, key = x => x) {
    let result = undefined;
    let minKey = undefined;

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

export function almostEquals(a, b) {
    return Math.abs(a - b) <= 1e-5;
}
