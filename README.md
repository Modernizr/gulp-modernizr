# gulp-modernizr [![Build Status](https://secure.travis-ci.org/rejas/gulp-modernizr.png?branch=master,develop)](https://travis-ci.org/rejas/gulp-modernizr)

[![NPM](https://nodei.co/npm/gulp-modernizr.png?compact=true)](https://nodei.co/npm/gulp-modernizr/)

A [Gulp](https://gulpjs.com/) wrapper for [Modernizr](https://github.com/doctyper/customizr).

*Note*: This plugin uses version 3 of Modernizr. Make sure to check the [Github repo](https://github.com/Modernizr/Modernizr/tree/master/feature-detects) for the correct feature names (example: ```Modernizr.touch``` was renamed to ```Modernizr.touchevents```).

## Usage

First, install `gulp-modernizr` as a development dependency:

```shell
npm install --save-dev gulp-modernizr
```

Then, add it to your `gulpfile.js`:

```javascript
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src('./js/*.js')
    .pipe(modernizr())
    .pipe(gulp.dest('build/'))
});
```

Running the plugin will search for tests in your `src` files like this one for example:

```javascript
if (!Modernizr.objectfit) { doSomethingLikeCallAPolyfill(); }
```

and in this case add the 'objectfit' test to the ouptut file.

## API

### modernizr(fileName)

#### fileName
Type: `String`

You can optionally pass a fileName to name the Modernizr file (defaults to 'modernizr.js')

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr('modernizr-custom.js'));
```

### modernizr(/*fileName, */ settings)

#### settings
Type: `Object`

You can pass settings as an object. See the [customizr repository](https://github.com/doctyper/customizr#config-file) for valid settings.

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr({
    excludeTests: ['csstransforms3d']
  }));
```

The 'settings' object can also be required from a JSON file:

modernizr-config.json:
```javascript
{
        'options': ['setClasses'],
        'tests': ['webworkers']
}
```

gulpfile.js:

```javascript
gulp.src('./js/*.js')
 .pipe(modernizr(require('./modernizr-config.json')))
```

#### Available Settings
##### See the [customizr repository](https://github.com/Modernizr/customizr#config-file) for valid settings.

#### `settings.crawl`
Currently not passed on to customizr, see [issue #36](https://github.com/rejas/gulp-modernizr/issues/36) 

#### `settings.quiet`
Defaults to false, setting it to true suppresses any log output from customizr

#### `settings.uglify`
Will never be passed to customizr, see the [Gulp guidelines](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md). The option to uglify the build goes against guidelines #1 and #3. Thus, this setting has been removed from this plugin. You may use [`gulp-uglify`](https://npmjs.org/package/gulp-uglify) to achieve this functionality in Gulp:

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr())
  .pipe(uglify())
  .pipe(gulp.dest("build/"));
```

[modernizr-travis-url]: https://travis-ci.org/rejas/gulp-modernizr
[modernizr-travis-image]: https://secure.travis-ci.org/rejas/gulp-modernizr.png?branch=master
[modernizr-npm-url]: https://npmjs.org/package/gulp-modernizr
[modernizr-npm-image]: https://badge.fury.io/js/gulp-modernizr.png

## License
Copyright (c) 2018 Rejas
Licensed under the MIT license.
