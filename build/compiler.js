const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const px2rpx = require('./gulp-px2rpx');
const src = path.resolve(__dirname, '../src');
const esDir = path.resolve(__dirname, '../dist');

const lessCompiler = dist =>
  function compileLess() {
    return gulp
      .src([`${src}/**/*.less`, `!${src}/common/style/**/*.less`])
      .pipe(less())
      .pipe(postcss())
      .pipe(
        insert.transform((contents, file) => {
          if (file.path.includes('components')) {
            contents = `@import '../../common/index.wxss';${contents}`;
          }
          return contents;
        })
      )
      .pipe(px2rpx({
        screenWidth: 375, // 设计稿屏幕, 默认750
        wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
        remPrecision: 6 ,// 小数精度, 默认6
        minPixelValue: 4 //设置要替换的最小像素值
      }))
      .pipe(rename({extname: '.wxss'}))
      .pipe(gulp.dest(`${dist}`));
  };

const copier = (dist, ext) =>
  function copy() {
    return gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(dist));
  };

const staticCopier = dist =>
  gulp.parallel(
    copier(dist, 'wxml'),
    copier(dist, 'wxs'),
    copier(dist, 'json'),
    copier(dist, 'js'),
    copier(dist, 'wxss')
  );

const tasks = {};

tasks.buildSrc = gulp.series(
  gulp.parallel(
    lessCompiler(esDir),
    staticCopier(esDir),
    () =>
      gulp.src(`${src}/images/**/*`).pipe(gulp.dest(`${esDir}/images`)),
    () => {
      gulp.watch(`../src/**/*.less`, lessCompiler(esDir));
      gulp.watch(`../src/**/*.wxml`, copier(esDir, 'wxml'));
      gulp.watch(`../src/**/*.wxs`, copier(esDir, 'wxs'));
      gulp.watch(`../src/**/*.json`, copier(esDir, 'json'));
      gulp.watch(`../src/**/*.js`, copier(esDir, 'js'));
      gulp.watch(`../src/**/*.wxss`, copier(esDir, 'wxss'));
    }
  )
);

module.exports = tasks;
