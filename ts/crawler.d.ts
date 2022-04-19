/// <reference types="cheerio" />
import Crawler from 'crawler';
import { TranslationType } from './models/language.enum';
import { WordBlock } from './models/word.interface';
import { Config } from './models/config.interface';
export default class TurkishCrawler {
    c: Crawler;
    constructor();
    translate(word: string, translationType: TranslationType, config?: Config): Promise<WordBlock[]>;
    crawl(word: string, translationType: TranslationType): Promise<WordBlock[]>;
    isExpectedAmount(allData: WordBlock[], amount: number): WordBlock[];
    getWordsContainerHeader(hElement: cheerio.Element): string;
}
