// tests/circus.test.js
describe('describe test', () => {
    it('works', () => {
        expect(1).toBe(1);
    });
});

describe('second describe test', () => {
    it(`doesn't work`, () => {
        expect(1).toBe(2);
    });
});