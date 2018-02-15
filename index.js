'use strict'

const asyncEach = require('each-async');
const download = require('npm-registry-download');

const getPackageNames = require('./get');

function downloadPackages (count, callback) {
  getPackageNames(count)
    .then(listOfPackages => {
      asyncEach(listOfPackages, function(title) {
        download(title, { dir: `${__dirname}/packages/${title}` });
      });
    })
    .then(() => callback())
    .catch(err => callback(err));
};

module.exports = downloadPackages
