
# 工程目录树
```
|-- client					--------前端项目界面代码
    |--base					    --------构建页面基础组件
    |--common					--------前端界面对应静态资源
    |--components				--------业务组件
    |--config					--------配置文件
    |--eventBus					--------eventBus
    |--filter					--------过滤器
    |--mixins					--------混入
    |--pages					--------页面
    |--plugins					--------可编辑图表组件(未来组件库扩展可以定义在这里)
    |--router					--------路由配置
    |--store					--------vuex状态管理
    |--service					--------axios封装
    |--App.vue					--------App
    |--main.js					--------入口文件
    |--permission.js			--------权限控制
|-- server					--------服务器端项目代码
    |--config					--------编辑器数据库连接相关配置
    |--db					    --------组件的数据源连接相关数据库的连接
    |--middleware				--------中间件
    |--models					--------Schema和Model
    |--routes					--------路由
    |--views					--------ejs页面模板
    |--public					--------静态资源
    |--utils					--------工具方法
    |--app.js					--------服务端入口
|-- db-file					--------数据库文件
|-- engine-template			--------页面模板引擎，使用webpack打包成js提供页面引用
|-- docs					--------项目文档生成目录
|-- docs					--------编写项目文档目录
|-- config.json				--------配置文件
```