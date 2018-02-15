'use strict'

const asyncEach = require('each-async');
const download = require('npm-registry-download'); // lol npm

const getPackageNames = require('./get');

function downloadPackages (count, callback) {
  getPackageNames(count)
    .then(listOfPackages => {
      asyncEach(listOfPackages, function(title) {
        download(title, { dir: `${__dirname}/packages/${title}` })
      });
    })
    .catch(err => console.log(err));
}

module.exports = downloadPackages
