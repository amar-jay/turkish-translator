const {TurkishCrawler} = require("../lib/crawler");
const {TranslationType} = require("../lib/models");
/* Testing */
async function print(word) {
	const tureng = new TurkishCrawler();
	const data = await tureng.translate(word, "turkish-english");
	console.log(JSON.stringify(data));
	// console.log(data[0]?.words.map((each) => each.text));
}

print("chair");