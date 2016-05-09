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
//处理 html
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
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        default: this.appName
      }, {
        type: 'input',
        name: 'appDescription',
        message: 'Description:',
        default: 'Create an app using WebpackReact generator with React Redux Router Webpack etc.'
      }, {
        type: 'input',
        name: 'appVersion',
        message: 'Version:',
        default: '0.0.1'
      }, {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: ''
      }];

      //FIXME 使用 yeoman-generator 0.23.x 版本, 在 mac 下本地 npm link 不能正常执行,需要 yeoman-generator 0.22.x
      this.prompt(prompts, function (answers) {
        this.appName = answers.appName;
        this.appDescription = answers.appDescription.replace('\"', '\\"');
        this.appVersion = answers.appVersion;
        this.author = answers.author;
        done();
      }.bind(this));
    },

    askForCSSAndJSFile: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'style',
        message: 'Which style language do you want to use?',
        choices: [
          {
            name: 'css',
            value: 'css',
            suffix: '.css'
          },
          {
            name: 'sass',
            value: 'sass',
            suffix: '.scss'
          },
          {
            name: 'less',
            value: 'less',
            suffix: '.less'
          }
        ],
        default: 'css'
      }, {
        type: 'confirm',
        name: 'postcss',
        message: 'Enable postcss?',
        default: false
      }, {
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

        this.style = answers.style;
        this.postcss = answers.postcss;
        this.bootstrap = hasFeature('includeBootstrap');

        done();
      }.bind(this));
    }
  },

  /**
   * 优先级 3
   * 保存用户配置项，同时配置工程（创建.editorconfig文件或者其他metadata文件）
   * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   */
  configuring: function () {
    this.template('editorconfig', '.editorconfig');
    this.template('_package.json', 'package.json');
  },

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
      var folder = ['images', 'json',  'scripts', 'static-html', 'templates'];
      var that = this;
      folder.forEach(function(item){
        that.directory(path.join(appPath, item), path.join('app', item));
      });
      this.directory(docsPath, path.join('docs'));

      // 样式
      var style = this.style;
      if (style === 'css') {
        this.directory(path.join(appPath, 'styles'), path.join('app', 'styles'));
      } else if (style === 'sass') {
        this.directory(path.join(appPath, 'sass'), path.join('app', 'sass'));
      } else if (style === 'less') {
        this.directory(path.join(appPath, 'less'), path.join('app', 'less'));
      }

      //模板文件
      this.template(path.join(appPath, 'scripts/index.js'), path.join('app', 'scripts/index.js'));

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
    //this.installDependencies();
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
