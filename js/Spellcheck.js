/**
 * Spellcheck.js - Make text sound more human with consistent personality quirks
 */

class Spellcheck {
  constructor(persona = {}) {
    this.persona = {
      typoRate: persona.typoRate || 0.08,
      grammarRate: persona.grammarRate || 0.12,
      casualness: persona.casualness || 0.6,
      consistentMisspellings: persona.consistentMisspellings || {},
      grammarQuirks: persona.grammarQuirks || ['missingApostrophes', 'lowercaseI'],
      ...persona
    };

    // Common consistent misspellings people make
    this.defaultMisspellings = {
      'definitely': 'definately',
      'separate': 'seperate',
      'occurred': 'occured',
      'necessary': 'neccessary',
      'tomorrow': 'tommorow',
      'beginning': 'begining',
      'rhythm': 'rythm',
      'maintenance': 'maintainance',
      'accommodate': 'accomodate',
      'embarrass': 'embarass'
    };

    // Casual contractions and shortcuts
    this.casualizations = {
      'going to': 'gonna',
      'want to': 'wanna',
      'got to': 'gotta',
      'kind of': 'kinda',
      'sort of': 'sorta',
      'out of': 'outta',
      'lot of': 'lotta',
      'because': 'cause',
      'probably': 'prolly',
      'don\'t know': 'dunno',
      'you': 'u',
      'are': 'r',
      'your': 'ur',
      'you\'re': 'ur'
    };

    // Their/there/they're confusion patterns
    this.homophones = {
      'their': ['there', 'their', 'their'],
      'there': ['their', 'there', 'there'],
      'they\'re': ['their', 'there', 'they\'re'],
      'your': ['your', 'you\'re', 'your'],
      'you\'re': ['your', 'you\'re', 'your'],
      'its': ['its', 'it\'s', 'its'],
      'it\'s': ['its', 'it\'s', 'it\'s'],
      'then': ['then', 'than', 'then'],
      'than': ['than', 'then', 'than']
    };
  }

  /**
   * Main method - humanize the text
   */
  humanize(text) {
    let result = text;

    // Apply in order of operations
    result = this.applyCasualizations(result);
    result = this.applyConsistentMisspellings(result);
    result = this.applyRandomTypos(result);
    result = this.applyHomophoneErrors(result);
    result = this.applyGrammarQuirks(result);
    
    return result;
  }

  /**
   * Apply casual speech patterns
   */
  applyCasualizations(text) {
    if (Math.random() > this.persona.casualness) return text;

    let result = text;
    for (const [formal, casual] of Object.entries(this.casualizations)) {
      if (Math.random() < this.persona.casualness) {
        const regex = new RegExp(`\\b${formal}\\b`, 'gi');
        result = result.replace(regex, casual);
      }
    }
    return result;
  }

  /**
   * Apply consistent misspellings this persona always makes
   */
  applyConsistentMisspellings(text) {
    let result = text;
    const misspellings = {
      ...this.defaultMisspellings,
      ...this.persona.consistentMisspellings
    };

    for (const [correct, wrong] of Object.entries(misspellings)) {
      if (Math.random() < 0.7) { // 70% chance to use their consistent misspelling
        const regex = new RegExp(`\\b${correct}\\b`, 'gi');
        result = result.replace(regex, match => {
          return this.preserveCase(wrong, match);
        });
      }
    }
    return result;
  }

  /**
   * Apply random typos to words
   */
  applyRandomTypos(text) {
    const words = text.split(/\b/);
    
    return words.map(word => {
      if (word.length < 4 || !/[a-z]/i.test(word)) return word;
      if (Math.random() > this.persona.typoRate) return word;

      const typoType = Math.random();
      
      if (typoType < 0.3) {
        // Letter transposition (swap two adjacent letters)
        return this.transposeLetters(word);
      } else if (typoType < 0.5) {
        // Double letter
        return this.doubleLetter(word);
      } else if (typoType < 0.7) {
        // Missing letter
        return this.dropLetter(word);
      } else {
        // Adjacent key typo
        return this.adjacentKeyTypo(word);
      }
    }).join('');
  }

  /**
   * Apply their/there/they're type confusions
   */
  applyHomophoneErrors(text) {
    let result = text;
    
    for (const [word, options] of Object.entries(this.homophones)) {
      if (Math.random() < this.persona.grammarRate) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, match => {
          const replacement = options[Math.floor(Math.random() * options.length)];
          return this.preserveCase(replacement, match);
        });
      }
    }
    return result;
  }

  /**
   * Apply grammar quirks like missing apostrophes, lowercase i, etc.
   */
  applyGrammarQuirks(text) {
    let result = text;
    const quirks = this.persona.grammarQuirks;

    if (quirks.includes('missingApostrophes') && Math.random() < 0.3) {
      // Remove some apostrophes from contractions
      result = result.replace(/(\w+)'(\w+)/g, (match, before, after) => {
        if (Math.random() < 0.4) {
          return before + after; // dont, cant, etc
        }
        return match;
      });
    }

    if (quirks.includes('lowercaseI') && Math.random() < 0.3) {
      // Sometimes use lowercase 'i' instead of 'I'
      result = result.replace(/\bI\b/g, match => {
        return Math.random() < 0.5 ? 'i' : match;
      });
    }

    if (quirks.includes('missingPunctuation') && Math.random() < 0.2) {
      // Occasionally drop ending punctuation
      result = result.replace(/[.!?](\s|$)/g, (match, space) => {
        return Math.random() < 0.3 ? space : match;
      });
    }

    if (quirks.includes('extraSpaces') && Math.random() < 0.15) {
      // Add occasional double spaces
      result = result.replace(/\s/g, match => {
        return Math.random() < 0.1 ? '  ' : match;
      });
    }

    return result;
  }

  // === HELPER METHODS ===

  transposeLetters(word) {
    const chars = word.split('');
    const pos = Math.floor(Math.random() * (chars.length - 1));
    if (/[a-z]/i.test(chars[pos]) && /[a-z]/i.test(chars[pos + 1])) {
      [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
    }
    return chars.join('');
  }

  doubleLetter(word) {
    const chars = word.split('');
    const pos = Math.floor(Math.random() * chars.length);
    if (/[a-z]/i.test(chars[pos])) {
      chars.splice(pos, 0, chars[pos]);
    }
    return chars.join('');
  }

  dropLetter(word) {
    const chars = word.split('');
    if (chars.length <= 4) return word;
    const pos = Math.floor(Math.random() * chars.length);
    if (/[a-z]/i.test(chars[pos])) {
      chars.splice(pos, 1);
    }
    return chars.join('');
  }

  adjacentKeyTypo(word) {
    const keyboard = {
      'a': ['s', 'q', 'w'], 'b': ['v', 'g', 'h', 'n'],
      'c': ['x', 'd', 'f', 'v'], 'd': ['s', 'e', 'r', 'f', 'c', 'x'],
      'e': ['w', 'r', 'd', 's'], 'f': ['d', 'r', 't', 'g', 'v', 'c'],
      'g': ['f', 't', 'y', 'h', 'b', 'v'], 'h': ['g', 'y', 'u', 'j', 'n', 'b'],
      'i': ['u', 'o', 'k', 'j'], 'j': ['h', 'u', 'i', 'k', 'n', 'm'],
      'k': ['j', 'i', 'o', 'l', 'm'], 'l': ['k', 'o', 'p'],
      'm': ['n', 'j', 'k'], 'n': ['b', 'h', 'j', 'm'],
      'o': ['i', 'p', 'l', 'k'], 'p': ['o', 'l'],
      'q': ['w', 'a'], 'r': ['e', 't', 'f', 'd'],
      's': ['a', 'w', 'e', 'd', 'x', 'z'], 't': ['r', 'y', 'g', 'f'],
      'u': ['y', 'i', 'j', 'h'], 'v': ['c', 'f', 'g', 'b'],
      'w': ['q', 'e', 's', 'a'], 'x': ['z', 's', 'd', 'c'],
      'y': ['t', 'u', 'h', 'g'], 'z': ['a', 's', 'x']
    };

    const chars = word.split('');
    const pos = Math.floor(Math.random() * chars.length);
    const char = chars[pos].toLowerCase();
    
    if (keyboard[char]) {
      const adjacent = keyboard[char];
      const newChar = adjacent[Math.floor(Math.random() * adjacent.length)];
      chars[pos] = chars[pos] === chars[pos].toUpperCase() ? newChar.toUpperCase() : newChar;
    }
    
    return chars.join('');
  }

  preserveCase(replacement, original) {
    if (original[0] === original[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  /**
   * Create a new persona preset
   */
  static createPersona(name, config) {
    const presets = {
      casual: {
        typoRate: 0.12,
        grammarRate: 0.15,
        casualness: 0.8,
        grammarQuirks: ['missingApostrophes', 'lowercaseI']
      },
      formal: {
        typoRate: 0.03,
        grammarRate: 0.05,
        casualness: 0.2,
        grammarQuirks: []
      },
      chaotic: {
        typoRate: 0.2,
        grammarRate: 0.25,
        casualness: 0.9,
        grammarQuirks: ['missingApostrophes', 'lowercaseI', 'missingPunctuation', 'extraSpaces']
      },
      teenager: {
        typoRate: 0.15,
        grammarRate: 0.2,
        casualness: 0.95,
        grammarQuirks: ['missingApostrophes', 'lowercaseI', 'missingPunctuation'],
        consistentMisspellings: {
          'oh my god': 'omg',
          'laughing': 'lol',
          'okay': 'ok'
        }
      }
    };

    return new Spellcheck(presets[name] || config);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Spellcheck;
}