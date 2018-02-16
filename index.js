'use strict'

const { each } = require('async');
const { download } = require('nrd');

const getPackageNames = require('./get');

function downloadPackages(count, callback) {
  getPackageNames(count)
    .then(listOfPackages => { 
      each(listOfPackages, (title, cb) => {
          download(title, { dir: `${__dirname}/packages/${title}` })
            .then(() => cb())
        },
        function (err) {
          if (err) { throw err; }
          return callback();
        })
    })
    .catch(err => callback(err));
};

module.exports = downloadPackages
