import assert from 'assert';
import * as utils from '../src/utils';

test('utils.min', () => {
    expect(utils.min([2, 1, 4, 10])).toBe(1);
    expect(utils.min([20, 200, 4, 10, 0.001])).toBe(0.001);
    expect(utils.min([2, 1, 4, -10], x => x * x)).toBe(1);
    expect(utils.min([20, 200, 4, 10, 0.001], x => -x)).toBe(200);
    expect(utils.min(['Hello', 'world', 'coffe', 'tea'], x => x.length)).toEqual('tea');
    expect(utils.min([])).toBeUndefined();
    expect(utils.min([20, 200, 4, 10, 0.001], x => undefined)).toBeUndefined();
    expect(utils.min(['Hello', 'world', 'coffe', 'tea'], x => undefined)).toBeUndefined();
});

