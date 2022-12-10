console.log('Hello, World!');

const fruits = ['banana', 'mango', 'apple'];
const upperFruits = fruits.map((name) => name.toUpperCase());

function createMapWord(word: string) {
    const mapWord: {[key: string] : number} = {};
    for (let i = 0; i < word.length; i += 1) {
        mapWord[word[i]] = mapWord[word[i]] ? mapWord[word[i]] + 1 : 1;
    }
    return mapWord;
}

function isAnnogram(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) {
        return false;
    }

    const mapWord1 = createMapWord(word1);
    const mapWord2 = createMapWord(word2);
    console.log(mapWord1, mapWord2)
    for (let i = 0; i < word2.length; i += 1) {
        const currentSymbol = word2[i];

        if (!Object.prototype.hasOwnProperty.call(mapWord1, currentSymbol)) {
            return false;
        }

        if (mapWord1[currentSymbol] !== mapWord2[currentSymbol]) {
            return false;
        }

    }

    return true;
}

function filterAnagrams(word: string, listWords: string[]) {

    const annagrams: string[] = [];

    for (let i = 0; i < listWords.length; i += 1) {
        const currentWordFromList = listWords[i];

        if (!isAnnogram(word, currentWordFromList)) {
            continue;
        }

        annagrams.push(currentWordFromList)
    }

    return annagrams;
}

console.log(


filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']),

)