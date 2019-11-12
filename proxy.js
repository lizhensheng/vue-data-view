
const apiRoutes = require('./apirouter')
const configRoutes = require('./configrouter')
const controlRoutes = require('./controlrouter')
module.exports = (api) => {
    api.configureDevServer(app => {
        //http请求体解码
        let bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        //普通请求
        app.use('/api', apiRoutes)
        //配置项请求
        app.use('/config',configRoutes)

        app.use('/control',controlRoutes)
    })
};
module.exports.defaultModes = {
    build: 'development'
};