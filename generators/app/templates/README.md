# <%= appName %>

这个项目是基于 [generator-webpack-react](https://www.npmjs.com/package/generator-webpack-react) 创建的，
generator-webpack-react 最新版本为 <%= pkg.version %>

**generator-webpack-react** 可以用来快速搭建 react 种子项目，包括实例代码、本地开发、单元测试、打包、压缩、md5 生成等。

## <%= appName %> 包含的内容
<%= appName %> 会用最新技术搭建，主要包含

* [react](http://facebook.github.io/react/)
* [redux](http://redux.js.org/)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/reactjs/react-router)
* 代码基于 [eslint](http://eslint.org/) 来检测，确保编码更加规范

## 开发与发布
### 运行

```
npm install -g gulp
npm install
gulp server
```

### 打包
会自动生成压缩后的 zip 文件(文件名基于上线格式:YYYYMMDDTHHmm)和 md5，方便部署

```
gulp build
```

## <%= appName %> 目录结构

* app 项目主目录,存放项目开发过程中 js 和 scss html 等文件
* docs 帮助文档
* examples 实例代码
