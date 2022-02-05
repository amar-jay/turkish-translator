export declare class Word {
    text: string;
    translatedText: string;
    order: number;
    category: string;
    translatedFrom: string;
    translatedTo: string;
    type: string;
    constructor(word?: Word);
}
export interface WordBlock {
    description: string;
    words: Word[];
}
