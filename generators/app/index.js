'use strict';
var path = require('path');
var fs = require('fs');
//Yeoman生成器
var generators = require('yeoman-generator');
//用来显示信息
var yosay = require('yosay');
//用来处理文字样式的，比如文字颜色
var chalk = require('chalk');
var _ = require('underscore.string');
var htmlWiring = require('html-wiring');
var pkg = require('../../package.json');

var Base = generators.Base;
var readFileAsString = htmlWiring.readFileAsString;
var baseRootPath = path.join(__dirname, 'templates');

module.exports = Base.extend({

  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    Base.apply(this, arguments);

    this.option('skip-install', {
      desc: 'Skip the node installations',
      defaults: false
    });

    this.argument('appName', {type: String, required: false});
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = _.camelize(_.slugify(_.humanize(this.appName)));

    //应用名称
    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.config.defaults({
      appName: this.appName
    });

  },

  /**
   * 优先级 1
   * initializing - 你的初始化方法（检测当前项目状态，获取配置等）
   * initializing - Your initialization methods (checking current project state, getting configs, etc)
   */
  initializing: function () {
    this.pkg = pkg;
  },

  /**
   * 优先级 2 prompting可以是{}，里面列出多个方法，如
   * prompting:{
      askFor: function () {},
      askForGeneratorName: function () {}
     }
   * prompting – 给用户展示选项提示（调用this.prompt()）
   * prompting - Where you prompt users for options (where you'd call this.prompt())
   */
  prompting: {
    askForApp: function () {
      var done = this.async();

      // welcome message
      // 显示提示信息.
      this.log(yosay(
        'Welcome to the striking ' + chalk.red('WebpackReact') + ' generator!'
      ));

      var prompts = [{
        name: 'appName',
        message: 'What is the name of your app?',
        default: this.appname
      }, {
        name: 'appDescription',
        message: 'Description:',
        default: 'Create an app using WebpackReact generator with React Redux Router Webpack etc.'
      }, {
        name: 'appVersion',
        message: 'Version:',
        default: '0.0.1'
      }, {
        name: 'author',
        message: 'Author:',
        default: ''
      }];

      this.prompt(prompts, function (answers) {
        this.appName = answers.appName;
        this.appDescription = answers.appDescription.replace('\"', '\\"')
        this.appVersion = answers.appVersion;
        this.author = answers.author;
        done();
      }.bind(this));
    },

    askForCSSAndJSFile: function () {
      var done = this.async();

      // welcome message
      // 显示提示信息.
      this.log(yosay(
        'Welcome to the striking ' + chalk.red('WebpackReact') + ' generator!'
      ));

      /**
       * 对于 sass 或 less 判断待完善
       * {
          name: 'Sass',
          value: 'includeSass',
          checked: true
        }
       *
       */
      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name: 'Bootstrap',
          value: 'includeBootstrap',
          checked: false
        }]
      }];

      this.prompt(prompts, function (answers) {
        var features = answers.features;

        function hasFeature(feat) {
          return features && features.indexOf(feat) !== -1;
        }

        //this.includeSass = hasFeature('includeSass');
        this.includeBootstrap = hasFeature('includeBootstrap');

        done();
      }.bind(this));
    }
  },

  /**
   * 优先级 3
   * 保存用户配置项，同时配置工程（创建.editorconfig文件或者其他metadata文件）
   * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   */
  configuring: {},

  /**
   * 优先级 4
   */
  default: {},

  /**
   * 优先级 5
   * writing – 用于生成和生成器相关的文件（比如routes,controllers等）
   * Where you write the generator specific files (routes, controllers, etc)
   */
  writing: {
    gulpfile: function () {
      this.template('gulpfile.babel.js');
    },
    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },
    git: function () {
      this.template('gitignore', '.gitignore');
    },
    eslint: function () {
      this.template('eslintrc', '.eslintrc');
    },
    babel: function () {
      this.template('babelrc', '.babelrc');
    },
    webpack: function () {
      this.template('webpack.config.babel.js');
      this.template('webpack.production.config.babel.js');
    },
    readme: function () {
      this.template('README.md');
    },

    writeReactApp: function () {
      var appPath = path.join(baseRootPath, 'app');
      var docsPath = path.join(baseRootPath, 'docs');
      var examplesPath = path.join(baseRootPath, 'examples');

      this.directory(appPath, path.join('app'));
      this.directory(docsPath, path.join('docs'));
      this.directory(examplesPath, path.join('examples'));

      // 由于模板文件 layout.html 中，字符串与 yeoman generator 冲突，需要单独处理一下
      var tmplFile = readFileAsString(path.join(baseRootPath, 'app/templates/layout.html'));
      tmplFile = tmplFile.replace(/\{\{htmlWebpackPlugin\}\}/g, '<%= htmlWebpackPlugin.options.title %>');
      this.write(this.env.options.appPath + '/templates/layout.html', tmplFile);
    }

  },

  /**
   * 优先级 6
   * conflicts – 用于处理冲突异常（内部使用）
   * conflicts - Where conflicts are handled (used internally)
   */
  conflicts: {},

  /**
   * 优先级 7
   * install – 用于安装相关库 (npm, bower)
   * install - Where installation are run (npm, bower)
   */
  install: function () {
    if (this.options['skip-install']) {
      return;
    }
    this.installDependencies();
  },

  /**
   * 优先级 8
   * end – 最后调用，常用于清理、道别等
   * end - Called last, cleanup, say good bye, etc
   */
  end: function () {
    this.log(yosay(
      'You have generated a React app basing on WebpackReact generator.'
    ));
  }

});
