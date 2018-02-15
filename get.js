const cheerio = require('cheerio');
const rp = require('request-promise');

const getPackageNames = function(count = 10, offset = 0, topPackages = []) {
  const URL = `https://www.npmjs.com/browse/depended?offset=${offset}`;

  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);
      $('.name').each((idx, el) => {
        if (idx < count) {
          offset++;
          const href = el.attribs.href;
          topPackages.push(trim(href));
        }
      });
      if (topPackages.length >= count) {
        return topPackages;
      } else { // handle pagination
        count -= topPackages.length;
        return getPackageNames(count, offset, topPackages);
      }
    })
    .catch(err => {
      // write to console for now
      console.log(err)
    });
};

/* 
  Trim the `href` at each <a> tag
    expected input { '/package/lodash' }
    expected output { 'lodash' }
*/

const trim = endPoint => endPoint.split('/')[2];

module.exports = getPackageNames;
