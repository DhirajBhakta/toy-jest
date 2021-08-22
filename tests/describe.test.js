// tests/circus.test.js

const banana = require("./banana.js");
it("tastes good", ()=>{
    expect(banana).toBe("good")

})
describe('describe test', () => {
    it('works', () => {
        expect(1).toBe(1);
    });
});

describe('second describe test', () => {
    it(`doesn't work`, async () => {
        await new Promise(resolve=> setTimeout(resolve, 3000))
        expect(1).toBe(1);
    });
})