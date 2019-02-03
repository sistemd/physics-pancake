import Vector2 from '../src/Vector2';

const sqrt5 = Math.sqrt(5);

test('Vector2.normalized', () => {
    let v = new Vector2(10, 0);
    expect(v.normalized.almostEquals(new Vector2(1, 0))).toBeTruthy();
    v = new Vector2(0, 10);
    expect(v.normalized.almostEquals(new Vector2(0, 1))).toBeTruthy();
    v = new Vector2(5, 5);
    expect(v.normalized.almostEquals(new Vector2(Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    v = new Vector2(-5, -5);
    expect(v.normalized.almostEquals(new Vector2(-Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    v = new Vector2(-5, 5);
    expect(v.normalized.almostEquals(new Vector2(-Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    v = new Vector2(-5, 10);
    expect(v.normalized.almostEquals(new Vector2(-1 / sqrt5, 2 / sqrt5))).toBeTruthy();
});

test('Vector2.normal', () => {
    let v = new Vector2(0, 10);
    expect(v.normal(new Vector2(1, 0).almostEquals(new Vector2(1, 0)))).toBeTruthy();
    expect(v.normal(new Vector2(-1, 0).almostEquals(new Vector2(-1, 0)))).toBeTruthy();

    v = new Vector2(10, 0);
    expect(v.normal(new Vector2(0, 1).almostEquals(new Vector2(0, 1)))).toBeTruthy();
    expect(v.normal(new Vector2(0, -1).almostEquals(new Vector2(0, -1)))).toBeTruthy();

    v = new Vector2(0, -10);
    expect(v.normal(new Vector2(1, 0).almostEquals(new Vector2(1, 0)))).toBeTruthy();
    expect(v.normal(new Vector2(-1, 0).almostEquals(new Vector2(-1, 0)))).toBeTruthy();

    v = new Vector2(10, 10);
    expect(v.normal(new Vector2(0, 1).almostEquals(new Vector2(-Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(-1, 0).almostEquals(new Vector2(-Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(-20, 20).almostEquals(new Vector2(-Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(0, -1).almostEquals(new Vector2(Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(1, 0).almostEquals(new Vector2(Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(20, -20).almostEquals(new Vector2(Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();

    v = new Vector2(10, -10);
    expect(v.normal(new Vector2(0, 1).almostEquals(new Vector2(Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(1, 0).almostEquals(new Vector2(Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(20, 20).almostEquals(new Vector2(Math.SQRT1_2, Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(0, -1).almostEquals(new Vector2(-Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(-1, 0).almostEquals(new Vector2(-Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();
    expect(v.normal(new Vector2(-20, -20).almostEquals(new Vector2(-Math.SQRT1_2, -Math.SQRT1_2)))).toBeTruthy();

    v = new Vector2(-5, -10);
    expect(v.normal(new Vector2(0, 1).almostEquals(new Vector2(-1 / sqrt5, 2 / sqrt5)))).toBeTruthy();
    expect(v.normal(new Vector2(1, 0).almostEquals(new Vector2(-1 / sqrt5, -2 / sqrt5)))).toBeTruthy();
    expect(v.normal(new Vector2(20, 19).almostEquals(new Vector2(-1 / sqrt5, 2 / sqrt5)))).toBeTruthy();
    expect(v.normal(new Vector2(0, -1).almostEquals(new Vector2(-1 / sqrt5, -2 / sqrt5)))).toBeTruthy();
    expect(v.normal(new Vector2(-1, 0).almostEquals(new Vector2(-1 / sqrt5, 2 / sqrt5)))).toBeTruthy();
    expect(v.normal(new Vector2(-18, -20).almostEquals(new Vector2(-1 / sqrt5, -2 / sqrt5)))).toBeTruthy();
});

