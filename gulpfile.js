/*
 * Jack Sutherland 2021
 * https://www.jacksutherland.com
 *
 * Website Gulp File
 */

// Gulp Tasks

const { src, dest, parallel, watch } = require('gulp');

// Gulp Plugins

const rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  terser = require('gulp-terser'),
      concat = require('gulp-concat');

// CSS Commands

var css = {
	site: function(callback)
	{
	  	return src(['./src/sass/site.scss'])
			.pipe(sass())
			.pipe(concat('site.css'))
	        .pipe(dest('./web/css/'))
	        .pipe(sass({outputStyle: 'compressed'}))
	        .pipe(rename({ suffix: '.min' }))
	        .pipe(dest('./web/css/'));
	}
};

// JavaScript Commands

var js = {
	site: function(callback)
	{
		return src([
				'./src/js/site.js'
			])
			.pipe(concat('site.js'))
			.pipe(dest('./web/js/'))
			.pipe(terser())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./web/js/'));
	}
};

// Execute Default Tasks

exports.default = parallel(css.site, js.site);

// Execute Watch Tasks

exports.watch = function()
{
	exports.default();

	// watch scss files
	watch('./src/sass/*.scss', css.site);
	
	// watch js files
	watch('./src/js/*.js', js.site);
}