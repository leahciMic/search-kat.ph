var bluebird = require('bluebird'),
    request = bluebird.promisifyAll(require('request')),
    cheerio = require('cheerio');

module.exports = function search(query) {
	return request
		.getAsync({
			url: 'http://kickass.to/usearch/' + encodeURIComponent(query) + '/',
			gzip: true
		})
		.catch(function(error) {
			console.log(arguments);
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
						files: +$($(this).children()[2]).text(),
						age: $($(this).children()[3]).text(),
						seeds: +$($(this).children()[4]).text(),
						leech: +$($(this).children()[5]).text(),
						magnet: $(this).find('.ka-magnet').parent().attr('href'),
						torrent: $($(this).find('.ka-arrow-down')).parent().attr('href')
					};
				})
				.get();
		});
};
