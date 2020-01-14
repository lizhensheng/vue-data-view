let fs =require('fs')
let path =require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
function resolve(name){
    return __dirname + '/' + name
}
module.exports = {
    assetsDir:"static",
    pages:{
        index:{
            entry:'client/main.js',
            template:'public/engine-h5-long.html',
            filename:'index.html'
        }
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:4000',
                ws: false,
                changeOrigin: true,
                pathRewrite:{}
            }
        }
    },
    css:{
        loaderOptions:{
            sass:{
                data:fs.readFileSync(path.resolve(__dirname,'./client/common/styles/variables.scss'),'utf-8')
            }
        }
    },
    productionSourceMap:process.env.NODE_ENV !=='production',
    configureWebpack:config=>{
        if(process.env.NODE_ENV === 'production'){
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename:'[path].gz[query]',
                    algorithm:'gzip',
                    test:new RegExp('\\.('+productionGzipExtensions.join('|')+')$'),
                    threshold:10240,
                    minRatio:0.8
                })
            )
        }
        else{

        }
    },
    chainWebpack: config=>{
        config.resolve.alias
            .set('@',path.resolve('client'))
            .set('@client',path.resolve('client'))
            .set('@plugins',path.resolve('plugins'))
            .set('@server',path.resolve('server'))
        config.module
            .rule('js')
            .include.add(/engine-template/).end()
            .include.add(/client/).end()
            .include.add(/common/).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options=>{
                return options
            })
    }
}