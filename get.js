const cheerio = require('cheerio');
const rp = require('request-promise');

let limit = 10
const URL = 'https://www.npmjs.com/browse/depended';

const getPackageNames = function() {
  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);
      const topPackages = [];
      $('.name').each((idx, el) => {
        if (idx < limit) {
          const packageName = el.attribs.href;
          topPackages.push(trim(packageName));
        }
      });
      return topPackages;
    })
    .catch(err => {
      // write to console for now
      console.log(err)
    });
};

const trim = longName => longName.split('/')[2];

getPackageNames()
  .then(packageList => console.log(packageList))