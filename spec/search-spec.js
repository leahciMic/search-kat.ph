var search = require('../search.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Parse kat.ph results', function() {
    it('should get something sane from a search', function(done) {
        search('test').then(function(results) {
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].name.length).toBeGreaterThan(0);
            expect(results[0].size.length).toBeGreaterThan(0);
            expect(results[0].files).toBeGreaterThan(0);
            expect(results[0].age.length).toBeGreaterThan(0);
            expect(results[0].seeds).toBeGreaterThan(-1);
            expect(results[0].leech).toBeGreaterThan(-1);
            expect(results[0].magnet.length).toBeGreaterThan(0);
            expect(results[0].torrent.length).toBeGreaterThan(0);
            done();
        });
    });
});
