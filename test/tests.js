'use strict';

const fs = require('fs');
const assert = require('chai').assert;
const Vinyl = require('vinyl');
const gulp = require('gulp');
const modernizr = require('../');

describe('gulp-modernizr', function() {
  describe('in buffer mode', function() {

    it('should generate a custom Modernizr file', function(done) {
      const TEST_PATH = __dirname + '/vanilla.js';

      const stream = gulp.src(TEST_PATH)
        .pipe(modernizr(
          'modernizr.js', {
            quiet: true,
            tests: ['history'],
            excludeTests: ['dart'],
            options: ['setClasses', 'html5printshiv'],
          }));

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents.toString()).indexOf('Modernizr'));
        assert.equal(-1, String(file.contents.toString()).indexOf('dart'));
        assert.notEqual(-1, String(file.contents.toString()).indexOf('html5printshiv'));
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
        tests: [
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
      const stream = gs('fake', { allowEmpty: true })
        .pipe(modernizr({
          crawl: false,
          tests: [
            'touchevents',
          ],
        })
        );

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents).indexOf('touchevents'));
        assert.equal(-1, String(file.contents).indexOf('dart'));
        done();
      });

      stream.end();
    });
  });
});
