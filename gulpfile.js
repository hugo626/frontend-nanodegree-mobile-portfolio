/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageResize = require('gulp-image-resize');
var ngrok = require('ngrok');
var psiNgrok = require('psi-ngrok');
var port = 8000;

var reload = browserSync.reload;

var DIST = 'dist/';
var SRC = 'src/';
var PIZZA_ROOT = 'views/';
var PIZZA_SRC_PATH = SRC + PIZZA_ROOT;
var PIZZA_DIST_PATH = DIST + PIZZA_ROOT;

var copyAndMinifyImage = function(src, dist, name) {
    return gulp.src(src)
        .pipe($.imagemin([$.imagemin.jpegtran({
                progressive: true,
            }),
            $.imagemin.optipng({
                optimizationLevel: 7
            }), imageminJpegRecompress({
                method: 'smallfry',
                quality: 'high'
            })
        ]))
        .pipe($.if(['pizzeria-large.jpg'], imageResize({
            width: 720
        })))
        .pipe($.if(['pizza.png'], imageResize({
            width: 205
        })))
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: name
        }));

};

var copyAndMinifyHtml = function(src, dist, name) {
    return gulp.src(src, {
            dot: true
        })
        // Minify Any HTML
        .pipe($.if('*.html', $.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS:true,
            minifyCSS:true,

        })))
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: name
        }));
};

var copyAndUglifyJs = function(src, dist, name) {
    return gulp.src(src)
        .pipe($.uglify())
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: name
        }));
};

var copyAndMinifyCss = function(src, dist, name) {
    var AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src(src)
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        // Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: name
        }));
}

// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src([SRC + '**/*.js', PIZZA_SRC_PATH + '**/*.js'])
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Copy Images top level image to (dist/img)
gulp.task('copy-top-images', function() {
    return copyAndMinifyImage(SRC + 'img/**/*.{svg,png,jpg}', DIST + 'img', 'top-images');
});

// Copy All html Files At The Root Level (src)
gulp.task('copy-top-html', function() {
    return copyAndMinifyHtml(SRC + '*.html', DIST, 'top-html');
});

// Copy top level js file to (dist/js)
gulp.task('copy-top-js', function() {
    return copyAndUglifyJs(SRC + 'js/*.js', DIST + 'js/', 'top-js');

});

// Copy top level js file to (dist/css)
gulp.task('copy-top-css', function() {
    return copyAndMinifyCss(SRC + 'css/*.css', DIST + 'css', 'top-css');
});

// Copy pizza level html Files to (dist/views/)
gulp.task('copy-pizza-html', function() {
    return copyAndMinifyHtml(PIZZA_SRC_PATH + '*.html', PIZZA_DIST_PATH, 'pizza-html');
});

// Copy Images pizza level image to (dist/views/images)
gulp.task('copy-pizza-images', function() {
    return copyAndMinifyImage(PIZZA_SRC_PATH + 'images/**/*.{svg,png,jpg}', PIZZA_DIST_PATH + '/images/', 'pizza-images');
});

// Copy pizza level js file to (dist/views/js)
gulp.task('copy-pizza-js', function() {
    return copyAndUglifyJs(PIZZA_SRC_PATH + 'js/*.js', PIZZA_DIST_PATH + 'js/', 'pizza-js');

});

// Copy top level js file to (dist/css)
gulp.task('copy-pizza-css', function() {
    return copyAndMinifyCss(PIZZA_SRC_PATH + 'css/*.css', PIZZA_DIST_PATH + 'css', 'pizza-css');
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {
    dot: true
}));

// Watch Files For Changes & Reload
gulp.task('serve:dev', '', function() {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'WSK-DEV',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['.tmp', 'src']
    }, function(err, bs) {
        ngrok.connect(bs.options.get('port'), function(err, url) {
            gutil.log(' -------------------------------------');
            gutil.log('\r', '      NGROK:', gutil.colors.magenta(url));
            gutil.log(' -------------------------------------');
        });
    });

    gulp.watch(['src/*.html', 'src/views/*.html'], reload);
    gulp.watch(['src/css/*.css', 'src/views/css/*.css'], reload);
    gulp.watch(['src/js/*.js', 'src/views/js/*.js'], ['jshint', reload]);
    gulp.watch(['src/img/*', 'src/views/images/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve', ['default'], function() {
    browserSync({
        notify: false,
        logPrefix: 'WSK-DIST',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist',
        baseDir: "dist"
    });

    gulp.watch('src/*.html', ['copy-top-html', reload]);
    gulp.watch('src/css/*.css', ['copy-top-css', reload]);
    gulp.watch('src/js/*.js', ['jshint', 'copy-top-js', reload]);
    gulp.watch('src/img/*', ['copy-top-images', reload]);
    gulp.watch('src/views/*.html', ['copy-pizza-html', reload]);
    gulp.watch('src/views/css/*.css', ['copy-pizza-css', reload]);
    gulp.watch('src/views/js/*.js', ['jshint', 'copy-pizza-js', reload]);
    gulp.watch('src/views/images/*', ['copy-pizza-images', reload]);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
    runSequence(['copy-top-html', 'copy-top-images', 'copy-top-js', 'copy-top-css',
        'copy-pizza-html', 'copy-pizza-images', 'copy-pizza-js', 'copy-pizza-css',
    ], cb);
});

var connectServer = function() {
    return $.connect.server({
        root: 'dist',
        port: port
    });
};

function handleError(err) {
    console.log(err.toString());
    // process.exit(-1);
}
// Run PageSpeed Insights
gulp.task('pagespeed', function() {
    psiNgrok({
        pages: ['index.html', 'views/pizza.html'],
        port: port,
        onBeforeConnect: connectServer,
        onError: handleError,
        options: {
            threshold: 90
        }
    });
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }