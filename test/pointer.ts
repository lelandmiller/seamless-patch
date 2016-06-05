import test = require('tape');
import {parse} from '../src/pointer';

const validCases: [string, string[]][] = [
    ['', []],
    ['/', ['']],
    ['/foo/-', ['foo', '-']],
    ['/foo/bar', ['foo', 'bar']],
    ['/foo~0/bar~1/~0~1/~1~0/~0~0', ['foo~', 'bar/', '~/', '/~', '~~']],
    ['/~00/~01/~10/~11', ['~0', '~1', '/0', '/1']],
];

test('parse should parse valid pointers', t => {
    validCases.forEach(([pointerString, pointerArray]) => {
        const [err, result] = parse(pointerString);
        t.equal(err, null, `should not return an error for ${pointerString}`);
        t.deepEqual(result, pointerArray, `should correctly parse ${pointerString}`);
    });
    t.end();
});

const invalidCases = [
    'foo',
    'foo/bar',
];

test('parse should return an Error for invalid pointers', t => {
    invalidCases.forEach(pointer => {
        const [err] = parse(pointer);
        if (!(err instanceof Error)) {
            t.fail(`should return an error for ${pointer}`);
        }
    });
    t.end();
});
