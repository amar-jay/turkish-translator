export class Word {
	text: string | undefined;
	translatedText: string | undefined;
	order: number;
	category: string | undefined;
	translatedFrom: string;
	translatedTo: string;
	type: string | undefined;
	constructor(word?: Word) {
		if (word) {
			Object.assign(this, word);
		}
	}
}

export interface WordBlock {
  description: string;
  words: Word[];
}
