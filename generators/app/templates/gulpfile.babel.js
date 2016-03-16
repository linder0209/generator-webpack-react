import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import gutil from 'gulp-util';
import opn from 'opn';
import del from 'del';
import moment from 'moment';
import md5File from 'md5-file';
import chalk from 'chalk';

import config from './webpack.config.babel';
import productionConfig from './webpack.production.config.babel';

const $ = gulpLoadPlugins();
const ip = 'localhost';
const port = '9090';

// 解决gulp不能利用babel正确解决编译es6的问题
// https://markgoodyear.com/2015/06/using-es6-with-gulp/
// 部分配置参考 https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

//利用sass生成styles任务
gulp.task('sass', () => {
  return gulp.src('app/sass/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/styles'));
});

//需要替换的内容,主要是一些配置文件中的内容,比如发布 ip 等

gulp.task('replace', () => {
  return gulp.src(['dist/index*.js'])
    .pipe($.replace('source', 'target'))
    .pipe($.replace(/abc\d+?/, ''))
    .pipe(gulp.dest('dist'));
});

// 计算文件大小
gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: '文件大小：', gzip: true}));
});

/**
 * 压缩
 * 文件名格式： fe-m-module-YYYYMMDDTHHmm 符合上线发布格式
 */
const fileName = `fe-m-module-${moment().format('YYYYMMDDTHHmm')}.zip`;
gulp.task('zip', () => {
  return gulp.src('dist/*')
    .pipe($.zip(fileName))
    .pipe(gulp.dest('zip'));
});

gulp.task('md5', ['zip'], () => {
  md5File(`zip/${fileName}`, (error, md5) => {
    if (error) {
      return console.log(error);
    }
    console.log(chalk.green('生成的压缩文件为'));
    console.log(chalk.magenta(fileName));
    console.log(chalk.green('生成的 md5 为'));
    console.log(chalk.magenta(md5));
  })
});

// 打包，这里采取异步处理，首先替换，替换完再压缩生成 md5
gulp.task('package', ['replace'], () => {
  gulp.start('md5');
});

//清理临时和打包目录
gulp.task('clean', del.bind(null, ['dist', 'zip']));

//启动服务
gulp.task('server', ['sass'], () => {
  // Start a webpack-dev-server
  const compiler = webpack(config);

  new WebpackDevServer(compiler, config.devServer)
    .listen(port, ip, (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      // Server listening
      gutil.log('[webpack-dev-server]', `http://${ip}:${port}/`);

      // keep the server alive or continue?
      opn(port === '80' ? `http://${ip}` : `http://${ip}:${port}/`, {app: 'chrome'});
    });

  gulp.watch('app/sass/**/*.scss', ['sass']);
});

// 用webpack 打包编译
gulp.task('webpack', () => {

  const compiler = webpack(productionConfig);
  // run webpack
  compiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));

    gulp.start(['package']);

  });
});

// 编译打包
gulp.task('build', ['clean', 'sass', 'webpack']);

//默认任务
gulp.task('default', () => {
  gulp.start('build', 'server');
});
