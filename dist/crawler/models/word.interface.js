"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
class Word {
    constructor(word) {
        if (word) {
            const keys = Object.keys(word);
            keys.forEach((el) => {
                const key = el;
                this[key] = word[key];
            });
        }
    }
}
exports.Word = Word;
