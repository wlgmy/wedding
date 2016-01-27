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


//project path
var des = './wedding/static';

//get static path
gulp.task('variable',function(){
   //js path
    jsPath = ['./wedding/html/js/*.js'];
    sassPath = ['./wedding/html/sass/*.scss'];
    imagePath = ['./wedding/html/images/*.*'];
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
    return gulp.src('./wedding/html/scss/app.scss')
        .pipe(sass({errLogToConsole:true}))
        .pipe(gulpif(des === './wedding/dist',minifycss({advanced:false})))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(des + '.css'));
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
            }
        })
    )
        .pipe(gulpif(des === './dist', uglify()))
        .pipe(gulp.dest(des + '/js'))
});

//default task
gulp.task('default',function(cb){
    des = './static';
    runSequence('variable','clean',['css','js'],cb);
});