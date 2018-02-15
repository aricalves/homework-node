const cheerio = require('cheerio');
const rp = require('request-promise');


const getPackageNames = function(limit = 10, offset = 0, topPackages = []) {
  const URL = `https://www.npmjs.com/browse/depended?offset=${offset}`;

  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);
      $('.name').each((idx, el) => {
        if (idx < limit) {
          offset++;
          const href = el.attribs.href;
          topPackages.push(trim(href));
        }
      });
      if (topPackages.length >= limit) {
        return topPackages;
      } else { // handle pagination
        limit -= topPackages.length;
        return getPackageNames(limit, offset, topPackages);
      }
    })
    .catch(err => {
      // write to console for now
      console.log(err)
    });
};

const trim = endPoint => endPoint.split('/')[2];

// getPackageNames(40)
//   .then(e => console.log(e.length, e))

module.exports = getPackageNames;
