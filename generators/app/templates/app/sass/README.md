## 该文件夹下用来定义 sass 样式

目前结构模式如下:

* main.scss 入口样式(可以是多个)
* core 基础样式库
 - components 定义各种基础样式库
 - mixins 定义样式函数库
 - mixins.scss 函数库入口样式
 - normalize.scss 引入重置样式库,[参加官方](https://github.com/necolas/normalize.css)
 - reset.scss 根据需要定制重置样式
 - variables.scss 定义样式变量
* modules 模块样式,定义各种功能模块样式

我们可以参考 bootstrap 等开源样式库来书写样式
