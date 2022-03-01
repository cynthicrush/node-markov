const {MarkovMachine} = require('./markov');

describe('Markov Machine Test', function() {
    test('Testing makeChains function', function() {
        let mm = new MarkovMachine('the cat in the hat is in the hat')

        expect(mm.chains).toEqual(new Map([
            ['the', ['cat', 'hat', 'hat']],
            ['cat', ['in']],
            ['in', ['the', 'the']],
            ['hat', ['is', null]],
            ['is', ['in']],
        ]))
    });

    test('Testing getRandom function', function() {
        let mm = new MarkovMachine('the cat in the hat is in the hat')
        expect(mm.getRandom([1, 1, 1])).toEqual(1);
        expect([1, 2, 3, 4]).toContain(mm.getRandom([1, 2, 3, 4]))
    });

    test('Testing makeText function', function() {
        let mm = new MarkovMachine('the cat in the hat is in the hat')
        let text = mm.makeText()
        expect(text.endsWith('hat')).toBe(true);
    })
})