import test = require('tape');
import {parse} from '../src/pointer';

test('pointer.parse should parse `/` as an empty array', t => {
    const result = parse('/');
    t.deepEqual(result, []);
    t.end();
});
