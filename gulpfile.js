var program = require('commander');
var browserify = require('browserify');
var express = require('express');
var path = require('path');
var rimraf = require('rimraf');

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var buffer = require('gulp-buffer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var babelify = require('babelify');
var less = require('gulp-less');
var micro = require('gulp-micro');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var source = require('vinyl-source-stream');
var typescript = require('gulp-tsc');

program.on('--help', function() {
    console.log('  Tasks:');
    console.log();
    console.log('    build       build the game');
    console.log('    clean       delete generated files');
    console.log('    dist        generate archive');
    console.log('    serve       launch development server');
    console.log('    watch       watch for file changes and rebuild automatically');
    console.log();
});

program
    .usage('<task> [options]')
    .option('-P, --prod', 'generate production assets')
    .option('-T, --transpile', 'transpile to ES5 with babel')
    .parse(process.argv);

var prod = !!program.prod;

var tsc = !!program.tsc;

gulp.task('default', ['build']);
gulp.task('build', ['build_source', 'build_index', 'build_styles']);

// gulp.task('build_source', function() {
//     // if (tsc) {
//     //     gulp.src(['src/**/*.ts'])
//     //         .pipe(typescript({
//     //             target: "ES6"
//     //         }))
//     //         .pipe(gulp.dest('jssrc/'))
//     //     var folder = 'jssrc/';
//     // } else {
//     //   var folder = './src/main'
//     // }
//
//     var bundler = browserify('./src/main', {
//         debug: !prod
//     }).transform("babelify", {
//         presets: ["es2015"]
//     });
//     if (prod) {
//         bundler.plugin(require('bundle-collapser/plugin'));
//     }
//
//     return bundler
//         .bundle()
//         // .on('error', browserifyError)
//         // .pipe(source('main.js'))
//         // .pipe(buffer())
//         // .pipe(gulpif(prod, uglify()))
//         .pipe(gulp.dest('build'));
// });

gulp.task('build_source', function() {

    var tempFolder = 'jsrrc/';
        gulp.src(['src/**/*.ts'])
            .pipe(typescript({
                target: "ES6"
            }))
            .pipe(gulp.dest(tempFolder));

    // 
    // var bundler = browserify('./src/main', {
    //     debug: !prod
    // }).transform("babelify", {
    //     presets: ["es2015"]
    // });
    // if (prod) {
    //     bundler.plugin(require('bundle-collapser/plugin'));
    // }
    //
    // return bundler
    //     .bundle()
    //     // .on('error', browserifyError)
    //     // .pipe(source('main.js'))
    //     // .pipe(buffer())
    //     // .pipe(gulpif(prod, uglify()))
    //     .pipe(gulp.dest('build'));
});

gulp.task('build_index', function() {
    return gulp.src('src/index.html')
        .pipe(gulpif(prod, htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
        })))
        .pipe(gulp.dest('build'));
});

gulp.task('build_styles', function() {
    return gulp.src('src/styles.less')
        .pipe(less())
        .pipe(concat('build.css'))
        .pipe(gulpif(prod, cssmin()))
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
    rimraf.sync('build');
    rimraf.sync('dist');
});

gulp.task('dist', ['build'], function() {
    if (!prod) {
        gutil.log(gutil.colors.yellow('WARNING'), gutil.colors.gray('Missing flag --prod'));
        gutil.log(gutil.colors.yellow('WARNING'), gutil.colors.gray('You should generate production assets to lower the archive size'));
    }

    return gulp.src('build/*')
        .pipe(zip('archive.zip'))
        .pipe(size())
        .pipe(micro({
            limit: 13 * 1024
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['build_source']);
    gulp.watch('src/styles.less', ['build_styles']);
    gulp.watch('src/index.html', ['build_index']);
});

gulp.task('serve', ['build'], function() {
    var htdocs = path.resolve(__dirname, 'build');
    var app = express();

    app.use(express.static(htdocs));
    app.listen(3000, function() {
        gutil.log("Server started on '" + gutil.colors.green('http://localhost:3000') + "'");
    });
});

function browserifyError(err) {
    gutil.log(gutil.colors.red('ERROR'), gutil.colors.gray(err.message));
    console.error(err);
    this.emit('end');
}
