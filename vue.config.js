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
                'base':resolve('src/base')
            }
        }
    }
}