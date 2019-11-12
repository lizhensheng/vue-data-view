function resolve(name){
    return __dirname + '/' + name
}
module.exports = {
    configureWebpack: {
        resolve:{
            alias:{
                'src':resolve('src'),
                'common':resolve('src/common'),
                "components":resolve('src/components'),
                'api':resolve('src/api'),
                'base':resolve('src/base'),
                'views':resolve('src/views')
            }
        }
    },
    devServer: {
        port: 8888,
        // proxy: {
        //     '/control': {
        //         target: 'http://localhost:4444',
        //         ws: false,
        //         changeOrigin: false
        //     }
        // }
    }
}