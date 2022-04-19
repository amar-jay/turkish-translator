"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurkishCrawler = void 0;
const crawler_1 = __importDefault(require("crawler"));
const models_1 = require("./models");
class TurkishCrawler {
    constructor() {
        this.c;
        this.crawl;
        this.isExpectedAmount;
    }
    async translate(word, translationType, config) {
        let conf = new models_1.Config();
        if (config) {
            conf = config;
        }
        let words = await this.crawl(word, translationType);
        if (!conf.detailed) {
            words = [words[0]];
        }
        if (conf.amount) {
            const filteredData = this.isExpectedAmount(words, conf.amount);
            words = filteredData;
        }
        return Promise.resolve(words);
    }
    crawl(word, translationType) {
        return new Promise((resolve, reject) => {
            this.c = new crawler_1.default({
                maxConnections: 10,
                callback: ((error, res, done) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const $ = res.$;
                        const searchResults = $(".tureng-searchresults-col-left").contents().filter(".table");
                        const allWords = [];
                        searchResults.each((i, table) => {
                            const words = [];
                            const wordBlock = { description: "", words };
                            const tableChildren = table.children;
                            if (!tableChildren) {
                                return;
                            }
                            let order = 1;
                            wordBlock.description = this.getWordsContainerHeader(table.prev.prev);
                            tableChildren.forEach((tableElement) => {
                                if (tableElement.name) {
                                    const wordProp = new models_1.Word();
                                    tableElement.children.forEach((tdElement) => {
                                        if (tdElement.name === "td") {
                                            if (!tdElement.children) {
                                                return;
                                            }
                                            const aEl = tdElement.children.filter((e) => {
                                                return e.name === "a";
                                            });
                                            const IEl = tdElement.children.filter((e) => {
                                                return e.name === "i";
                                            });
                                            if (tdElement.attribs.class && tdElement.attribs.class === "hidden-xs") {
                                                wordProp.category = tdElement.children[0].data;
                                            }
                                            if (aEl.length > 0) {
                                                if (IEl[0] && IEl[0].children[0]) {
                                                    const type = IEl[0].children[0].data;
                                                    wordProp.type = type;
                                                }
                                                if (tdElement.attribs.class.includes("tm")) {
                                                    const translatedFrom = tdElement.attribs.lang;
                                                    wordProp.translatedFrom = translatedFrom;
                                                    wordProp.text = aEl[0].children[0].data;
                                                    wordProp.order = order;
                                                    order++;
                                                }
                                                if (tdElement.attribs.class.includes("ts")) {
                                                    const translatedTo = tdElement.attribs.lang;
                                                    wordProp.translatedTo = translatedTo;
                                                    wordProp.translatedText = aEl[0].children[0].data;
                                                }
                                            }
                                        }
                                    });
                                    if (wordProp.text) {
                                        words.push(wordProp);
                                    }
                                }
                            });
                            wordBlock.words = words;
                            allWords.push(wordBlock);
                        });
                        resolve(allWords);
                    }
                    done();
                }).bind(this),
            });
            const url = `https://tureng.com/en/${translationType}/${word}`;
            this.c.queue(url);
        });
    }
    isExpectedAmount(allData, amount) {
        let amountOfWords = 0;
        const filteredByAmount = [];
        allData.forEach((wordBlock, indexOfWordBlock) => {
            if (!filteredByAmount[indexOfWordBlock]) {
                filteredByAmount[indexOfWordBlock] = {
                    description: "",
                    words: [],
                };
            }
            filteredByAmount[indexOfWordBlock].description = wordBlock.description;
            wordBlock.words.forEach((word) => {
                if (amountOfWords < amount) {
                    filteredByAmount[indexOfWordBlock].words.push(word);
                    amountOfWords++;
                }
            });
            if (filteredByAmount[indexOfWordBlock].words.length == 0) {
                delete filteredByAmount[indexOfWordBlock];
            }
        });
        return filteredByAmount;
    }
    getWordsContainerHeader(hElement) {
        let header = "";
        hElement.children.forEach((el) => {
            if (el.name === "b") {
                header = header + el.children[0].data;
            }
            else {
                header = header + el.data;
            }
        });
        return header;
    }
}
exports.TurkishCrawler = TurkishCrawler;
