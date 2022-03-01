/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for(let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i]
      let nextWord = this.words[i + 1] || null;
      if(chains.has(currWord)) {
        chains.get(currWord).push(nextWord)
      } else {
        chains.set(currWord, [nextWord])
      }  
    }
    this.chains = chains;
  }

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = this.getRandom(keys)
    let texts = []

    for(let i = 0; i < numWords; i++) {
      if( key !== null) {
        texts.push(key)
        key = this.getRandom(this.chains.get(key))
      }
    }
    return texts.join(' ')
  }
}

let mm = new MarkovMachine('the cat in the hat')
console.log(mm.makeText())

module.exports = {
  MarkovMachine,
};