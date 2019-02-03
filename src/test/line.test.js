/* eslint-env jest */

import Line from '../Line';
import Vector2 from '../Vector2';

const intersectionTests = [
    {
        lines: [
            new Line({
                origin: new Vector2(0.3010568075759541, -0.24496283007209785),
                end: new Vector2(0.9169249963710113, -0.6545767919089238),
            }),
            new Line({
                origin: new Vector2(0.8088976267729568, 0.618177132189516),
                end: new Vector2(0.7054884135684052, -0.6740398019380363),
            }),
        ],
        intersection: new Vector2(0.7176521140672991, -0.5220403883535367),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.3312485055546426, 0.7852534196091534),
                end: new Vector2(0.03939364585525862, -0.8583582180077562),
            }),
            new Line({
                origin: new Vector2(0.016520137630556597, 0.5164308913755378),
                end: new Vector2(-0.44889763141097294, 0.3503172085094022),
            }),
        ],
        intersection: new Vector2(-0.24923806042067276, 0.42157831812490537),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(0.15929947930819366, 0.38807925746997785),
                end: new Vector2(0.1194284946493005, -0.5166966779417812),
            }),
            new Line({
                origin: new Vector2(0.546594021604305, -0.3338073168924467),
                end: new Vector2(-0.8912055929779654, -0.4062946700702079),
            }),
        ],
        intersection: new Vector2(0.1265547360890823, -0.35498379776563327),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.9850936570422693, -0.28478386000195144),
                end: new Vector2(0.14665259267958586, -0.7349429120312096),
            }),
            new Line({
                origin: new Vector2(0.5013409429766256, 0.20053048476181812),
                end: new Vector2(-0.963492037318173, -0.5405250116470357),
            }),
        ],
        intersection: new Vector2(-0.6899924057113377, -0.4021622030575862),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.6435284997610997, 0.8107569174895628),
                end: new Vector2(-0.8658934827098932, -0.6457705323799638),
            }),
            new Line({
                origin: new Vector2(0.2173952514129467, -0.015054935370060418),
                end: new Vector2(-0.7631248074685961, 0.17625313753600835),
            }),
        ],
        intersection: new Vector2(-0.7410542693434904, 0.1719469817582977),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(0.14408552023064147, 0.9002465262857555),
                end: new Vector2(0.7444775901925875, -0.8576607994568775),
            }),
            new Line({
                origin: new Vector2(-0.01402900250322836, 0.09514265868890792),
                end: new Vector2(0.7961532459870908, -0.7679362623710044),
            }),
        ],
        intersection: new Vector2(0.6667524803516561, -0.6300869409410841),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.48647208224073135, 0.6787439504543218),
                end: new Vector2(0.3165562543341587, -0.42519473614338477),
            }),
            new Line({
                origin: new Vector2(0.5847362804630445, 0.03683183552246194),
                end: new Vector2(-0.9943471136419693, 0.1603573687481199),
            }),
        ],
        intersection: new Vector2(-0.05599115754947903, 0.08695344324012455),
    },
    {
        lines: [
            new Line({
                origin: new Vector2(0.9287766597797289, 0.837800699261841),
                end: new Vector2(-0.676190314140088, -0.22761659432832793),
            }),
            new Line({
                origin: new Vector2(-0.26535935584245607, 0.3099703065884156),
                end: new Vector2(0.4497163684535246, 0.7751134717007424),
            }),
        ],
        intersection: undefined,
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.0059050202396429, -0.2543651374302611),
                end: new Vector2(-0.33052133023353125, 0.5171719493751388),
            }),
            new Line({
                origin: new Vector2(-0.2628842701509062, 0.49453593475942115),
                end: new Vector2(0.674322183546771, -0.6029207828238814),
            }),
        ],
        intersection: undefined,
    },
    {
        lines: [
            new Line({
                origin: new Vector2(-0.659413833407045, -0.8827053405967435),
                end: new Vector2(-0.8949239677803149, 0.15790092855600535),
            }),
            new Line({
                origin: new Vector2(0.735935869782623, 0.5625908335820273),
                end: new Vector2(0.9289649684503059, -0.5897528925657627),
            }),
        ],
        intersection: undefined,
    },
    {
        lines: [
            new Line({
                origin: new Vector2(0.44712357566050365, 0.7221921877968129),
                end: new Vector2(-0.5615933174824297, 0.5813272865519408),
            }),
            new Line({
                origin: new Vector2(0.9579664892171198, 0.6491542758935478),
                end: new Vector2(0.09017052679284077, -0.29442242217206216),
            }),
        ],
        intersection: undefined,
    },
    {
        lines: [
            new Line({ origin: new Vector2(0, 0), end: new Vector2(10, 15) }),
            new Line({ origin: new Vector2(0, 0), end: new Vector2(10, 15) }),
        ],
        intersection: undefined,
    },
    {
        lines: [
            new Line({ origin: Vector2.zero, end: new Vector2(10, 15) }),
            new Line({ origin: Vector2.zero, end: new Vector2(-2, 3) }),
        ],
        intersection: Vector2.zero,
    },
    {
        lines: [
            new Line({ origin: new Vector2(10, 15), end: Vector2.zero }),
            new Line({ origin: new Vector2(-2, 3), end: Vector2.zero }),
        ],
        intersection: Vector2.zero,
    },
    {
        lines: [
            new Line({ origin: Vector2.zero, end: new Vector2(10, 15) }),
            new Line({ origin: new Vector2(-2, 3), end: Vector2.zero }),
        ],
        intersection: Vector2.zero,
    },
];

test('Line.intersection', () => {
    for (const { lines, intersection } of intersectionTests) {
        if (intersection === undefined) {
            expect(lines[0].intersection(lines[1])).toBeUndefined();
            expect(lines[1].intersection(lines[0])).toBeUndefined();
        } else {
            expect(lines[0].intersection(lines[1]).almostEquals(intersection)).toBeTruthy();
            expect(lines[1].intersection(lines[0]).almostEquals(intersection)).toBeTruthy();
        }
    }
});
