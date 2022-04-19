export declare class Word {
    text: string | undefined;
    translatedText: string | undefined;
    order: number;
    category: string | undefined;
    translatedFrom: string;
    translatedTo: string;
    type: string | undefined;
    constructor(word?: Word);
}
export interface WordBlock {
    description: string;
    words: Word[];
}
