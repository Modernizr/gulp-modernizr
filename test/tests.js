'use strict';

var fs = require('fs');
var assert = require('chai').assert;
var Vinyl = require('vinyl');
var gs = require('glob-stream');
var modernizr = require('../');

describe('gulp-modernizr', function() {
  describe('in buffer mode', function() {
    it('should generate a custom Modernizr file', function(done) {

      var stream = modernizr();

      var TEST_PATH = __dirname + '/vanilla.js';

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents).indexOf('Modernizr'));

        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();
    });

    it('should generate a custom Modernizr file with custom tests', function(done) {

      var stream = modernizr({
        crawl: false,
        'tests': [
          'touchevents',
        ],
      });

      var TEST_PATH = __dirname + '/vanilla.js';

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.equal(-1, String(file.contents).indexOf('webworkers'));

        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();

    });

    it('should generate a custom Modernizr file with custom tests and no source files', function(done) {

      var stream = gs('fake', {allowEmpty: true})
        .pipe(modernizr({
          crawl: false,
          'tests': [
            'touchevents',
          ],
        })
      );

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents).indexOf('touchevents'));

        done();
      });

      stream.end();

    });

  });
});
