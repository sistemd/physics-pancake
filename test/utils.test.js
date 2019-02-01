import assert from 'assert';
import { min } from '../src/utils';

test('utils.min', () => {
    expect(min([2, 1, 4, 10])).toBe(1);
    expect(min([20, 200, 4, 10, 0.001])).toBe(0.001);
    expect(min([2, 1, 4, -10], x => x * x)).toBe(1);
    expect(min([20, 200, 4, 10, 0.001], x => -x)).toBe(200);
    expect(min(['Hello', 'world', 'coffe', 'tea'], x => x.length)).toEqual('tea');
    expect(min([])).toBeUndefined();
    expect(min([20, 200, 4, 10, 0.001], x => undefined)).toBeUndefined();
    expect(min(['Hello', 'world', 'coffe', 'tea'], x => undefined)).toBeUndefined();
});

