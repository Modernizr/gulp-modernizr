"use strict";

var fs = require("fs"),
	assert = require("assert"),
	gutil = require("gulp-util"),
	modernizr = require("../");

describe("gulp-modernizr", function () {
	describe("in buffer mode", function () {

		it("should generate a custom Modernizr file", function (done) {

			var stream = modernizr(),
				TEST_PATH = __dirname + "/vanilla.js";

			stream.on("data", function (file) {
				assert.notEqual(-1, String(file.path).indexOf("modernizr.js"));
				assert.notEqual(-1, String(file.contents).indexOf("Modernizr"));

				done();
			});

			stream.write(new gutil.File({
				path: TEST_PATH,
				contents: fs.readFileSync(TEST_PATH)
			}));

			stream.end();

		});

	});
});
