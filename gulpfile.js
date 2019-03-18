var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    clean       = require('gulp-clean'),
    copy        = require('gulp-copy'),
    imagemin    = require('gulp-imagemin'),
    less        = require('gulp-less'),
    cssmin      = require('gulp-cssmin'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect'),
    gulpOpen    = require('gulp-open'),
    gulpsequence= require('gulp-sequence'),
    rev         = require('gulp-rev'),
    revCollector= require('gulp-rev-collector')
    watch       = require('gulp-watch'),
    //babel       = require('gulp-babel'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    source      = require('vinyl-source-stream'),
    del         = require('del');

//--------------更改你的flash文件名称--------------
var animateName = 'test';

const isDev = (process.env.NODE_ENV === 'development')
gulp.task('server',['revHtmlJs'], function () {
    connect.server({
        name: 'createjs',
        root: 'dist',
        port: 8002,
        host: '0.0.0.0',
        livereload: true
      });
});
gulp.task('open',['server'], function (done) {
    gulp.src('')  
        .pipe(gulpOpen({
            uri: 'http://localhost:8002/'
        }))
        .on('end', done);
});

gulp.task('clean', function (done) {
    return gulp.src(['dist'])
        .pipe(clean());
});
gulp.task('copyFile',function(done){
    var assets = gulp.src('src/assets/**/**/*');
    var images = gulp.src('src/images/*');
    if(!isDev){
        const config = {
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }
        assets = assets.pipe(imagemin(config));
        images = images.pipe(imagemin(config));
    }
    assets.pipe(gulp.dest('./dist/assets/'));
    images.pipe(gulp.dest('./dist/images/'));
});
var cssSrc = 'src/css/index.less';
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(less())
        .pipe(rev())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./revs/css'));
});
gulp.task('revHtmlCss',['revCss'], function () {
    return gulp.src(['./revs/css/*.json', './src/index.html'])
        .pipe(revCollector())                         //替换html中对应的记录
        .pipe(gulp.dest('dist/'));                     //输出到该文件夹中
});
gulp.task('buildJs',['revHtmlCss'], function() {
    return browserify({entries: 'src/js/index.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('revs/buildJs/'));
}); 
var concatJsPath = {  
    scripts:[
        'src/js/lib/createjs.js',
        'src/'+animateName+'.js',
        'revs/buildJs/index.js'
    ]
} 
gulp.task('concatJs',['buildJs'], function() {   
    return gulp.src(concatJsPath.scripts)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('revs/concatJs/'));
}); 
gulp.task('revJs',['concatJs'], function(){
    let pipe = gulp.src('revs/concatJs/index.js');
    if(!isDev){
        pipe = pipe.pipe(uglify())
        .on('error', function (err) {
        //gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
    }
    return pipe
    .pipe(rev())                                //给文件添加hash编码
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录
    .pipe(gulp.dest('./revs/js'));
});
gulp.task('revHtmlJs',['revJs'], function () {
    return gulp.src(['./revs/js/*.json', './dist/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});
gulp.task('reload',['revHtmlJs'],function(){
    gulp.src(".")
    .pipe(connect.reload())
});
gulp.task('watch', function (done) {
    gulp.watch('./src/**/*',['copyFile','revCss','revHtmlCss','buildJs','concatJs','revJs','revHtmlJs','reload'])
});
gulp.task('build', ['clean'], function(){
    gulp.start('copyFile','revCss','revHtmlCss','buildJs','concatJs','revJs','revHtmlJs');
});
gulp.task('dev', ['clean'], function(){
    gulp.start('copyFile','revCss','revHtmlCss','buildJs','concatJs','revJs','revHtmlJs','server','open','watch');
});

