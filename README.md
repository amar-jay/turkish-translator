# ❗Currently deprecated
# Turkish Translator

This package allows you to get multiple meanings of a word asynchronously between;

+ Turkish to English -> english-turkish
+ English to Turkish -> turkish-english
+ French to English -> french-english
+ Spanish to English -> spanish-english
+ German to English

## Example　

```typescript
const {TurkishCrawler} = require("../lib/crawler");

async function print(word) {
	const tureng = new TurkishCrawler();
	const data = await tureng.translate(word, "turkish-english");
	console.log(JSON.stringify(data));
	// console.log(data[0]?.words.map((each) => each.text));
}

print("aircraft");
 /*[{
     description: 'Meanings of "aircraft" in Turkish English Dictionary : 42 result(s)',
     words: [ ...[Word] ]
     },
	 {
      description: 'Meanings of "aircraft" with other terms in English Turkish Dictionary : 500 result(s)',
      words: [...[Word]]
    }]
  
    also word has these properties;
  
    {
        category: 'Common Usage',
        type: 'n. ',
        translatedFrom: 'en',
        text: 'aircraft',
        order: 1,
        translatedTo: 'tr',
        translatedText: 'uçak'
    } 
  */
  ```

  ## Resources and Contributors
  - [Cuneydalan](http://https://github.com/cuneytdalan/tureng-translator)

