var path = require("path"),
	gutil = require("gulp-util"),
	through = require("through"),
	customizr = require("customizr");

module.exports = function (fileName, opt) {
	"use strict";

	var PLUGIN_NAME = "gulp-modernizr",
		DEFAULT_FILE_NAME = "modernizr.js";

	// Ensure fileName exists
	if (typeof fileName === "undefined") {
		fileName = DEFAULT_FILE_NAME;
	} else if (typeof fileName === typeof {}) {
		opt = fileName;
		fileName = DEFAULT_FILE_NAME;
	}

	// Ensure opt exists
	opt = opt || {};

	// Enable string parsing in Customizr
	opt.useBuffers = true;

	// Set crawl to false, Gulp is providing files & data
	opt.crawl = false;

	// Reset opt.files. Store buffers here.
	opt.files = [];

	// Per Gulp docs (https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md)
	// "Your plugin shouldn't do things that other plugins are responsible for"
	opt.uglify = opt.uglify || false;

	var firstFile;

	function storeBuffers(file) {
		if (file.isNull()) {
			return;
		}

		if (file.isStream()) {
			return stream.emit("error", new gutil.PluginError({
				plugin: PLUGIN_NAME,
				message: "Streaming not supported"
			}));
		}

		if (!firstFile) {
			firstFile = file;
		}

		opt.files.push(file);
	}

	function generateModernizr() {
		customizr(opt, function (data) {
			if (!data.result) {
				return stream.emit("error", new gutil.PluginError({
					plugin: PLUGIN_NAME,
					message: "No data returned"
				}));
			}

			var file = new gutil.File({
				path: path.join(firstFile.base, fileName),
				base: firstFile.base,
				cwd: firstFile.cwd,
				contents: new Buffer(data.result)
			});

			stream.queue(file);
			stream.queue(null);
		});
	}

	var stream = through(storeBuffers, generateModernizr);
	return stream;
};
