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
          }));

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

    it('should add options to the generated Modernizr file', function(done) {
      const TEST_PATH = __dirname + '/vanilla.js';

      const stream = gulp.src(TEST_PATH)
        .pipe(modernizr(
          'modernizr.js', {
            quiet: true,
            options: ['setClasses', 'html5printshiv'],
          }));

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents).indexOf('Modernizr'));
        assert.notEqual(-1, String(file.contents).indexOf('html5printshiv'));
        assert.notEqual(-1, String(file.contents).indexOf('setClasses'));
        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();
    });

    it('should add custom tests to the generated Modernizr file', function(done) {
      const TEST_PATH = __dirname + '/vanilla.js';

      const stream = gulp.src(TEST_PATH)
        .pipe(modernizr({
          quiet: true,
          tests: ['history'],
        }));

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.contents).indexOf('history'));
        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();
    });

    it('should not add excluded tests to the generated Modernizr file', function(done) {
      const TEST_PATH = __dirname + '/vanilla.js';

      const stream = gulp.src(TEST_PATH)
        .pipe(modernizr({
          quiet: true,
          excludeTests: ['dart'],
        }));

      stream.on('data', function(file) {
        assert.equal(-1, String(file.contents).indexOf('dart'));
        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();
    });

    it('should respect the crawl option set to false', function(done) {
      const FAKE_TEST_PATH = 'fake';

      const stream = gulp.src(FAKE_TEST_PATH, { allowEmpty: true })
        .pipe(modernizr({
          crawl: false,
          quiet: true,
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
