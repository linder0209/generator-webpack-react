# generator-webpack-react v0.3.0

[![NPM version][npm-image]][npm-url]
[![Dependency Status][daviddm-image]][daviddm-url] 
[![Coverage percentage][coveralls-image]][coveralls-url]

> Yeoman generator for using [React](http://facebook.github.io/react/) [Redux](http://redux.js.org/) 
[Router](https://github.com/reactjs/react-router) etc. with [Webpack](http://webpack.github.io/)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-webpack-react using
[npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-webpack-react
```

Then generate your new project:

```bash
mkdir demo
cd demo
yo webpack-react
```

start your project server:

```bash
npm install -g gulp
gulp server
```

build your project:

```bash
gulp build
```

start your project build server:

```
gulp connect
```

## Frameworks and Tools

* [react](http://facebook.github.io/react/)
* [redux](http://redux.js.org/)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/reactjs/react-router)
* [eslint](http://eslint.org/)

## Version Log

[Version](./VERSION.md)

## License

MIT © [linder](https://github.com/linder0209)

[npm-image]: https://badge.fury.io/js/generator-webpack-react.svg
[npm-url]: https://npmjs.org/package/generator-webpack-react
[daviddm-image]: https://david-dm.org/linder0209/generator-webpack-react.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/linder0209/generator-webpack-react
[coveralls-image]: https://coveralls.io/repos/linder0209/generator-webpack-react/badge.svg
[coveralls-url]: https://coveralls.io/r/linder0209/generator-webpack-react
