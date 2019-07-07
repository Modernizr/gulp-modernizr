var PluginError = require('plugin-error');
var Vinyl = require('vinyl');
var through = require('through2');
var customizr = require('customizr');

module.exports = function(fileName, opt) {
  'use strict';

  // Set some defaults
  var PLUGIN_NAME = 'gulp-modernizr';
  var DEFAULT_FILE_NAME = 'modernizr.js';

  // Ensure fileName exists
  if (typeof fileName === 'undefined') {
    fileName = opt ? opt.dest : DEFAULT_FILE_NAME;
  } else if (typeof fileName === typeof {}) {
    opt = fileName;
    fileName = DEFAULT_FILE_NAME;
  }

  // Ensure opt exists
  opt = opt || {};

  // Enable string parsing in customizr
  opt.useBuffers = true;

  // Ensure crawl exists
  if (opt.crawl === undefined) {
    opt.crawl = true;
  }

  // Reset opt.files. Store buffers here.
  opt.files = {
    src: [],
  };

  // Per Gulp docs (https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md)
  // "Your plugin shouldn't do things that other plugins are responsible for"
  opt.uglify = false;

  var stream;

  function storeBuffers(file, enc, callback) {

    // Return if null
    if (file.isNull()) {
      stream.push(file);
      return callback();
    }

    // No stream support (yet?)
    if (file.isStream()) {
      stream.emit('error', new PluginError({
        plugin: PLUGIN_NAME,
        message: 'Streaming not supported',
      }));

      return callback();
    }

    // Save buffer for later use
    opt.files.src.push(file);

    return callback();
  }

  function generateModernizr(callback) {
    if (opt.crawl && opt.files.src.length === 0) {
      return callback();
    }

    // Remove files if crawl is set to false
    if (!opt.crawl) {
      opt.files.src = [];
    }

    // Call customizr
    customizr(opt, function(data) {

      // Sanity check
      if (!data.result) {
        return stream.emit('error', new PluginError({
          plugin: PLUGIN_NAME,
          message: 'No data returned',
        }));
      }

      // Save result
      var file = new Vinyl({
        path: fileName,
        base: undefined,
        cwd: '',
        contents: Buffer.from(data.result),
      });

      // Pass data along
      stream.push(file);

      return callback();
    });
  }

  stream = through.obj(storeBuffers, generateModernizr);
  return stream;
};
