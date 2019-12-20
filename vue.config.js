function resolve(name){
    return __dirname + '/' + name
}
module.exports = {
    assetsDir:"static",
    pages:{
        index:{
            entry:'client/main.js',
            filename:'index.html'
        }
    },
    configureWebpack: {
        resolve:{
            alias:{
                'src':resolve('client'),
                'common':resolve('client/common'),
                "components":resolve('client/components'),
                'api':resolve('client/api'),
                'base':resolve('client/base'),
                'views':resolve('client/views')
            }
        }
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:4000',
                ws: false,
                changeOrigin: false,
                pathRewrite:{}
            }
        }
    }
}