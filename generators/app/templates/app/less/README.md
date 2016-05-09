## 该文件夹下用来定义 less 样式

目前结构模式如下:

* main.less 入口样式(可以是多个)
* core 基础样式库
 - components 定义各种基础样式库
 - mixins 定义样式函数库
 - mixins.less 函数库入口样式
 - normalize.less 引入重置样式库,[参加官方](https://github.com/necolas/normalize.css)
 - reset.less 根据需要定制重置样式
 - variables.less 定义样式变量
* modules 模块样式,定义各种功能模块样式

我们可以参考 bootstrap 等开源样式库来书写样式
