// // const TurkishTranslator = require('./lib/crawler.js').default;


// // const translator = new TurkishTranslator();
// // c = async () => await translator.translate('Merhaba', "TURENG")
// // console.log(await c());

// var Crawler = require("crawler");
// var crawlerConfig = new Crawler({
//     maxConnections : 10,
//     // This will be called for each crawled page
//     callback : function (err, res, done) {
//         if(err){
//             console.error("Error");
//         }else{
//             var translate = res.$;
//             // $ is Cheerio by default
//             //a lean implementation of core jQuery designed specifically for the server
//             console.log(translate("title").text());
//         }
//         done();
//     }
// });
// async function myCrawler(url) {
//     this.url = url;
//     crawlerConfig.queue("http://www.amazon.com");
//     this.crawlUrl = crawlerConfig.queue(this.url);
// }

// myCrawler();

// var d = new myCrawler("https://www.google.com");
// console.log("d",d.crawlUrl);
// console.log("d",crawlerConfig.queue('http://www.amazon.com'));

// const c = () => {
//     ans="this";
//     console.log("c", crawlerConfig.queue("http://www.amazon.com"));
//     return this.ans;
// }
 
// // Queue just one URL, with default callback
// // c.queue('http://www.amazon.com');
// d = c
// console.log(c());
 
// // // Queue a list of URLs
// // c.queue(['http://www.google.com/','http://www.yahoo.com']);
 
// // // Queue URLs with custom callbacks & parameters
// // c.queue([{
// //     uri: 'http://coursera.org/',
 
// //     // The global callback won't be called
// //     callback: function (error, res, done) {
// //         if(error){
// //             console.log(error);
// //         }else{
// //             var response = res.$;
// //             console.log(response('title').text(), 'bytes');
// //         }
// //         done();
// //     }
// // }]);
 
// // Queue some HTML code directly without grabbing (mostly for tests)
// // c.queue([{
// //     html: '<title>This is a <strong>test</strong></title>'
// // }]);
// //Slow down 
// //Use rateLimit to slow down when you are visiting web sites.

// // var Crawler = require("crawler");
 
// // var c = new Crawler({
// //     rateLimit: 1000, // `maxConnections` will be forced to 1
// //     callback: function(err, res, done){
// //         console.log(res.$("title").text());
// //         done();
// //     }
// // });
 
// // c.queue(tasks);//between two tasks, minimum time gap is 1000 (ms)





var Crawler = require("crawler");

async function C() {
    const that = this
    Object.assign(that, {body: "", url: "", title: ""});

    const crawler = await new Crawler({
        encoding:null,
        jQuery:false,// set false to suppress warning message.
        
        callback: (err, res, done) => {
            if(err) {
                console.error(err.stack);
            } 
            that.body = res.body;
        }
    
    })
    crawler.queue({
        uri: "https://my-blog-git-dev-amar-jay.vercel.app",
})

    return that;
}
C().then(c => {console.log(c.body)});
// console.log(qwerty);
 