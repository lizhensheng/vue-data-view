let fs =require('fs')
let path =require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')
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
        config.plugins.push(new MonacoEditorPlugin({
            // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            // Include a subset of languages support
            // Some language extensions like typescript are so huge that may impact build performance
            // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
            // Languages are loaded on demand at runtime 
            //'javascript', 'css', 'html', 'typescript',
            languages: [ 'json', 'sql', 'javascript']
          }))
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