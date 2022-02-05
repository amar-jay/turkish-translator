"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurengCrawler = void 0;
const Crawler = Promise.resolve().then(() => __importStar(require('crawler')));
const element_enum_1 = require("./models/element.enum");
const word_interface_1 = require("./models/word.interface");
const config_interface_1 = require("./models/config.interface");
class TurengCrawler {
    async translate(word, translationType, config) {
        let conf = new config_interface_1.Config();
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
            this.c = new Crawler({
                maxConnections: 10,
                callback: ((error, res, done) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const $ = res.$;
                        const searchResults = $(`.tureng-searchresults-col-left`).contents().filter('.table');
                        const allWords = [];
                        searchResults.each((i, table) => {
                            const words = [];
                            const wordBlock = { description: '', words };
                            const tableChildren = table.children;
                            if (!tableChildren) {
                                return;
                            }
                            let order = 1;
                            wordBlock.description = this.getWordsContainerHeader(table.prev.prev);
                            tableChildren.forEach((tableElement) => {
                                if (tableElement.name) {
                                    const wordProp = new word_interface_1.Word();
                                    tableElement.children.forEach((tdElement) => {
                                        if (tdElement.name === element_enum_1.ElementName.TD) {
                                            if (!tdElement.children) {
                                                return;
                                            }
                                            const aEl = tdElement.children.filter((e) => {
                                                return e.name === element_enum_1.ElementName.A;
                                            });
                                            const IEl = tdElement.children.filter((e) => {
                                                return e.name === element_enum_1.ElementName.I;
                                            });
                                            if (tdElement.attribs.class && tdElement.attribs.class === 'hidden-xs') {
                                                wordProp.category = tdElement.children[0].data;
                                            }
                                            if (aEl.length > 0) {
                                                if (IEl[0] && IEl[0].children[0]) {
                                                    const type = IEl[0].children[0].data;
                                                    wordProp.type = type;
                                                }
                                                if (tdElement.attribs.class.includes('tm')) {
                                                    const translatedFrom = tdElement.attribs.lang;
                                                    wordProp.translatedFrom = translatedFrom;
                                                    wordProp.text = aEl[0].children[0].data;
                                                    wordProp.order = order;
                                                    order++;
                                                }
                                                if (tdElement.attribs.class.includes('ts')) {
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
                    description: '',
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
        let header = '';
        hElement.children.forEach((el) => {
            if (el.name === element_enum_1.ElementName.B) {
                header = header + el.children[0].data;
            }
            else {
                header = header + el.data;
            }
        });
        return header;
    }
}
exports.TurengCrawler = TurengCrawler;
