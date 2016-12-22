var bluebird = require('bluebird'),
    debug = require('debug')('search-kat.ph:debug'),
    error = require('debug')('search-kat.ph:error'),
    request = bluebird.promisifyAll(require('request')),
    cheerio = require('cheerio');

module.exports = function search(query) {
  return request
    .getAsync({
      url: 'http://kickass.cd/usearch/' + encodeURIComponent(query) + '/',
      gzip: true
    })
    .catch(function(e) {
      error(e);
      throw e;
    })
    .then(function(result) {
      debug('Received result', result);
      return result;
    })
    .get(1)
    .then(cheerio.load)
    .then(function($) {
      return $('table#mainSearchTable table tr')
        .slice(1)
        .map(function(index, element) {
          return {
            name: $(this).find('.cellMainLink').text(),
            category: $(this).find('.cellMainLink').next().text().trim().replace(/^in\s+/, '').split(' > '),
            size: $($(this).children()[1]).text(),
            age: $($(this).children()[2]).text(),
            seeds: +$($(this).children()[3]).text(),
            leech: +$($(this).children()[4]).text(),
            magnet: $(this).find('a[title="Torrent magnet link"]').attr('href'),
            torrent: $(this).find('a[title="Download torrent file"]').attr('href')
          };
        })
        .get();
    });
};
