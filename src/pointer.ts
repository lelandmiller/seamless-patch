export function parse(pointer: string): [Error, string[]] {
    const err = pointer.length > 0 && pointer.charAt(0) !== '/'
        ? new Error('invalid pointer syntax')
        : null;
    return [err, pointer.split('/').slice(1).map(unescape)];
}

const escape1 = /~0/g;
const escape2 = /~1/g;

function unescape(token: string) {
    return token.replace(escape2, '/').replace(escape1, '~');
}
