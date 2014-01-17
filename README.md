<!---
# gulp-modernizr [![NPM version][modernizr-npm-image]][modernizr-npm-url] [![Build status][modernizr-travis-image]][modernizr-travis-url]
> Modernizr plugin for Gulp
-->
[![Build Status](https://travis-ci.org/doctyper/gulp-modernizr.png?branch=master,develop)](https://travis-ci.org/doctyper/gulp-modernizr)

# gulp-modernizr
A [Gulp](http://gulpjs.com/) wrapper for [Modernizr](https://github.com/doctyper/customizr).

## Usage

First, install `gulp-modernizr` as a development dependency:

```shell
npm install --save-dev gulp-modernizr
```

Then, add it to your `gulpfile.js`:

```javascript
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  gulp.src('./js/*.js')
    .pipe(modernizr());
    .pipe(dest("build/"))
});
```

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

#### Available Settings
##### See the [customizr repository](https://github.com/doctyper/customizr#config-file) for valid settings.

#### `settings.uglify`
Per the [Gulp guidelines](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md), the option to uglify the build is disabled for this plugin. You may use [`gulp-uglify`](https://npmjs.org/package/gulp-uglify) to retain this functionality in Gulp:

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr())
  .pipe(uglify())
  .pipe(dest("build/"));
```

[modernizr-travis-url]: http://travis-ci.org/doctyper/gulp-modernizr
[modernizr-travis-image]: https://secure.travis-ci.org/doctyper/gulp-modernizr.png?branch=master
<!---
[modernizr-npm-url]: https://npmjs.org/package/gulp-modernizr
[modernizr-npm-image]: https://badge.fury.io/js/gulp-modernizr.png
-->

## License
Copyright (c) 2013 Richard Herrera
Licensed under the MIT license.
