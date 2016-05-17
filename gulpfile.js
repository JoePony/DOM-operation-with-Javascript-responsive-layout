var gulp=require('gulp');
var minifycss=require('gulp-minify-css');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var srcCSS='./src/css/*.css';
var srcJS='./src/js/*.js';
var destCSS='./static/css';
var destJS='./static/js';
gulp.task('style',function(){
    return gulp.src(srcCSS)
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(destCSS));
});
gulp.task('script',function(){
    return gulp.src(srcJS)
    .pipe(uglify())
    .pipe(gulp.dest(destJS));
})
gulp.task('default',['style','script']);