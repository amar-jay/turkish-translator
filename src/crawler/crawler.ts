// import {CrawlerOptions} from './crawler/index2';
import Crawler from "crawler";
import { TranslationType, ElementName, Word, WordBlock, Config } from "./models";

export class TurkishCrawler {
	c: Crawler;
	constructor() {
		this.c;
		this.crawl;
		this.isExpectedAmount;
	}
	async translate(word: string, translationType: TranslationType, config?: Config): Promise<WordBlock[]> {
		let conf: Config = new Config();
		if (config) {
			conf = config;
		}

		let words: WordBlock[] = await this.crawl(word, translationType);
		if (!conf.detailed) {
			words = [words[0]];
		}
		if (conf.amount) {
			const filteredData = this.isExpectedAmount(words, conf.amount);
			words = filteredData;
		}
		return Promise.resolve(words);
	}

	crawl(word: string, translationType: TranslationType): Promise<WordBlock[]> {
		return new Promise<WordBlock[]>((resolve, reject) => {
			this.c = new Crawler({
				maxConnections: 10,
				callback: ((error: Error, res, done: () => void) => {
					if (error) {
						reject(error);
					} else {
						const $ = res.$;
						const searchResults = $(".tureng-searchresults-col-left").contents().filter(".table");
						const allWords: WordBlock[] = [];
						searchResults.each((i, table) => {
							const words: Word[] = [];
							const wordBlock: WordBlock = { description: "", words };
							const tableChildren = table.children;
							if (!tableChildren) {
								return;
							}
							let order = 1;
							wordBlock.description = this.getWordsContainerHeader(table.prev.prev);
							tableChildren.forEach((tableElement) => {
								if (tableElement.name) {
									const wordProp = new Word();
									tableElement.children.forEach((tdElement) => {
										if (tdElement.name === ElementName.TD) {
											if (!tdElement.children) {
												return;
											}
											const aEl = tdElement.children.filter((e) => {
												return e.name === ElementName.A;
											});
											const IEl = tdElement.children.filter((e) => {
												return e.name === ElementName.I;
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

	isExpectedAmount(allData: WordBlock[], amount: number) {
		let amountOfWords = 0;
		const filteredByAmount: WordBlock[] = [];
		allData.forEach((wordBlock, indexOfWordBlock) => {
			if (!filteredByAmount[indexOfWordBlock]) {
				filteredByAmount[indexOfWordBlock] = {
					description: "",
					words: [],
				};
			}
			filteredByAmount[indexOfWordBlock].description = wordBlock.description;
			wordBlock.words.forEach((word: Word) => {
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

	getWordsContainerHeader(hElement): string {
		let header = "";
		hElement.children.forEach((el) => {
			if (el.name === ElementName.B) {
				header = header + el.children[0].data;
			} else {
				header = header + el.data;
			}
		});
		return header;
	}
}
// /* Testing */
// async function print() {
// 	const tureng = new TurkishCrawler();
// 	const data = await tureng.translate("çorba", TranslationType.TURENG);
// 	console.log(JSON.stringify(data));
// 	// console.log(data[0]?.words.map((each) => each.text));
// }

// print();
