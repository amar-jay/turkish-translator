# Turkish Translator

This package allows you to get multiple meanings of a word asynchronously between;

+ Turkish to English -> ENGTUR
+ English to Turkish -> TURENG
+ French to English
+ Spanish to English
+ German to English

## Example　

```typescript
 import TurkishTranslate from 'turkish-translate' 
 const tc = new TurkishTranslate();
 const data = await tc.translate("aircraft", TranslationType.ENGTUR);
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
  - ['Cuneydalan']("http://https://github.com/cuneytdalan/tureng-translator")

