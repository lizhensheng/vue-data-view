
const apiRoutes = require('./apirouter')
const configRoutes = require('./configrouter')
const createConnection = require('./socket')
module.exports = (api, projectOptions) => {
    api.chainWebpack(webpackConfig => {
        // 通过 webpack-chain 修改 webpack 配置
    });

    api.configureWebpack(webpackConfig => {
        // 修改 webpack 配置
        // 或返回通过 webpack-merge 合并的配置对象
    });

    api.registerCommand('test', args => {
        // 注册 `vue-cli-service test`
    });

    api.configureDevServer(app => {
        //创建通信服务器
        createConnection(app)
        //http请求体解码
        let bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        //普通请求
        app.use('/api', apiRoutes)
        //配置项请求
        app.use('/config',configRoutes)
    })
};
module.exports.defaultModes = {
    build: 'development'
};