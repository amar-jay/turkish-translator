export class Word {
  text: string;
  translatedText: string;
  order: number;
  category: string;
  translatedFrom: string;
  translatedTo: string;
  type: string;
  constructor(word?: Word) {
    if (word) {
      Object.assign(this, word);
      const keys = Object.keys(word);
      //eys.forEach((el: string) => {
      //  const key = el as keyof Word;
      //this = { key : word[key]};
    }
  }
}

export interface WordBlock {
  description: string;
  words: Word[];
}
