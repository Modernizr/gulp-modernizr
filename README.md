# gulp-modernizr [![NPM version][modernizr-npm-image]][modernizr-npm-url] [![Build status][modernizr-travis-image]][modernizr-travis-url]
> Modernizr plugin for Gulp

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
});
```

## API

### modernizr(options)

#### options
Type: `Object`

You can pass options as an object. See the [list of available options](#link-to-customizr-repo) for valid options.

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr({
    excludeTests: ['csstransforms3d']
  }));
```

### modernizr(fileName)

#### fileName
Type: `String`

You can optionally pass a fileName to name the Modernizr file (defaults to 'modernizr.js')

```javascript
gulp.src('./js/*.js')
  .pipe(modernizr('modernizr-custom.js'));
```

<!---
[modernizr-travis-url]: http://travis-ci.org/lazd/gulp-modernizr
[modernizr-travis-image]: https://secure.travis-ci.org/lazd/gulp-modernizr.png?branch=master
[modernizr-npm-url]: https://npmjs.org/package/gulp-modernizr
[modernizr-npm-image]: https://badge.fury.io/js/gulp-modernizr.png
-->
