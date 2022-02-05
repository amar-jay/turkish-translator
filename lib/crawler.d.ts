import { TranslationType } from './models/language.enum';
import { WordBlock } from './models/word.interface';
import { Config } from './models/config.interface';
export declare class TurengCrawler {
    c: any;
    translate(word: string, translationType: TranslationType, config?: Config): Promise<WordBlock[]>;
    crawl(word: string, translationType: TranslationType): Promise<WordBlock[]>;
    isExpectedAmount(allData: WordBlock[], amount: number): WordBlock[];
    getWordsContainerHeader(hElement: any): string;
}
