export const epsilon = 1e-5;

type KeyFunc<T, K> = (x: T) => K;

type ComparisonFunc<T> = (left: T, right: T) => boolean;

function findExtrema<T>(sequence: T[], comp: ComparisonFunc<T>): number {
    let index;
    let minElem;

    for (let i = 0; i < sequence.length; ++i) {
        const elem = sequence[i];
        if (elem === undefined)
            continue;
        if (index === undefined || minElem === undefined || comp(elem, minElem)) {
            index = i;
            minElem = elem;
        }
    }

    if (index !== undefined) {
        return index;
    } else {
        return -1;
    }
}

export function min<T, K>(sequence: T[], key: KeyFunc<T, K>): T|undefined {
    const i = findExtrema(
        sequence.map(key),
        (left, right) => left < right,
    );

    if (i === -1)
        return undefined;
    else
        return sequence[i];
}

export function max<T, K>(sequence: T[], key: KeyFunc<T, K>): T|undefined {
    const i = findExtrema(
        sequence.map(key),
        (left, right) => left > right,
    );

    if (i === -1)
        return undefined;
    else
        return sequence[i];
}

export function almostEquals(a: number, b: number, x: number = epsilon): boolean {
    return Math.abs(a - b) <= x;
}

interface ValueIsBetweenParams {
    value: number;
    limits: number[];
}

export function valueIsBetween(params: ValueIsBetweenParams): boolean {
    const minLimit = Math.min(...params.limits);
    const maxLimit = Math.max(...params.limits);
    return minLimit <= params.value && params.value <= maxLimit;
}

export function randomRange(lower: number, upper: number): number {
    return Math.random() * (upper - lower) + lower;
}

export function sameSign(a: number, b: number): boolean {
    return (a > 0 && b > 0) || (a < 0 && b < 0);
}

// XXX Should this be here? It is difficult (impossible) to annotate
export function edgesAreConnected(edges: any): boolean {
    for (let i = 1; i < edges.length; ++i) {
        if (!edges[i].origin.almostEquals(edges[i - 1].end))
            return false;
    }

    return edges[0].origin.almostEquals(edges[edges.length - 1].end);
}

export function repeatTask(task: () => void, milliseconds: number): void {
    setTimeout(() => {
        task();
        repeatTask(task, milliseconds);
    }, milliseconds);
}
