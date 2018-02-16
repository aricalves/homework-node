const cheerio = require('cheerio');
const rp = require('request-promise');

const getPackageNames = function(count = 10, offset = 0, topPackages = []) {
  const URL = `https://www.npmjs.com/browse/depended?offset=${offset}`;

  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);
      // traverse html for every <a> with class 'name'
      $('.name').each((idx, el) => {
        if (idx < count) {
          offset++;
          const href = el.attribs.href;
          topPackages.push(trim(href));
        } else {
          return false; // break out of loop when COUNT is reached
        }
      });
      if (topPackages.length >= count) {
        return topPackages;
      } else {
        // handle pagination
        count -= topPackages.length;
        return getPackageNames(count, offset, topPackages);
      }
    })
    .catch(err => {
      // TODO: retry failed scrape or write to file
      console.error(err);
    });
};

/* 
  Trim the `href` at each <a> tag
    expected input { '/package/lodash' }
    expected output { 'lodash' }
*/

const trim = endPoint => endPoint.substr(9);

module.exports = getPackageNames;
