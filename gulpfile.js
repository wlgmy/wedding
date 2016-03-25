var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var path = require('path');
var argv = require('yargs').argv;
var del = require('del');
var gulpif = require('gulp-if');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");


//project path
var des = './wedding/static';

//get static path
gulp.task('variable',function(){
    //source path
    jsPath = ['./wedding/js/*.js'];
    sassPath = ['./wedding/sass/*.scss'];
    imagePath = ['./wedding/images/*.*'];
    return true;
});

//clean project path
gulp.task('clean',function(cb){
    return del([
        des+'/*'
    ],cb);
});

//gulp css
gulp.task('css',function(){
    return gulp.src('./wedding/scss/app.scss')
        .pipe(sass({errLogToConsole:true}))
        .pipe(gulpif(des === './wedding/dist',minifycss({advanced:false})))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(des + '/css/'));
});
//gulp js
gulp.task('js',function(){
    return gulp.src('./wedding/js/app.js')
        .pipe(gulpWebpack({
            entry:{
                app:'./wedding/js/app.js'
            },
            output:{
                filename: 'app.js'
            },
            
        })
    )
        .pipe(gulpif(des === './dist', uglify()))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(des + '/js'))
});
//copy html
gulp.task('html', function() {
    return gulp.src('./wedding/*.html')
        .pipe(gulp.dest(des));
});

//copy images
gulp.task('img', function() {
    return gulp.src('./wedding/images/*.*')
        .pipe(gulp.dest(des+'/images/'));
});

//copy files
gulp.task('src', function() {
    return gulp.src('./wedding/src/*.*')
        .pipe(gulp.dest(des+'/src/'));
});

//default task
gulp.task('default',function(cb){
    des = './static';
    runSequence('variable','clean',['css','js','html','img','src'],cb);
});