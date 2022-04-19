import Crawler from "crawler";
import { TranslationType, WordBlock, Config } from "./models";
export declare class TurkishCrawler {
    c: Crawler;
    constructor();
    translate(word: string, translationType: TranslationType, config?: Config): Promise<WordBlock[]>;
    crawl(word: string, translationType: TranslationType): Promise<WordBlock[]>;
    isExpectedAmount(allData: WordBlock[], amount: number): WordBlock[];
    getWordsContainerHeader(hElement: any): string;
}
