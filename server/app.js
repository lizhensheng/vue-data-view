const Koa = require('koa')
const render = require('koa-ejs')
const router = require('koa-router')()
const path = require('path')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const mongoConf = require('./config/mongo')
const formatresponse = require('./middleware/formatresponse')
const fs = require('fs')
const $config = require('../config')

const app = new Koa()
const SECRET = 'lkui'

app.use(cors())

app.use(koaStatic(__dirname+'/public'))



app.use(koaBody({
    multipart:true,
    formidable:{
        maxFileSize: 3000*1024*1024
    }
}))

render(app,{
    root: path.join(__dirname,'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
})
//调式阶段不使用koajwt
if(process.argv.slice(2).length > 0 && process.argv.slice(2)[0] === '--production')
{
    app.use(koajwt({secret:SECRET}).unless({
        path:[
            /^\/common\/html2canvas\/corsproxy/,
            /^\/project\/view/,
            /^\/project\/verify/,
            /^\/auth\/login/,
            /^\/auth\/register/,
            /^\/connection\/excuteSql/,
            /^\/upload_static\/images/
        ]
    }))
}

router.use(async (ctx,next)=>{
    let token = ctx.headers.authorization
    if(token){
        ctx.state.user = jsonwebtoken.verify(token.split(' ')[1],SECRET)
    }
    ctx.state.BASE_URL = $config.baseURL
    ctx.state.ROOT_PATH = path.join(__dirname,'../')
    ctx.state.SERVER_PATH = path.join(__dirname,'./')
    ctx.state.SECRET = SECRET
    await next()
})

mongoConf.connect()

fs.readdirSync(path.join(__dirname,'./routes')).forEach(route=>{
    let api=require(`./routes/${route}`)
    router.use(`/${route.replace('.js','')}`,api.routes())
})

app.use(formatresponse)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen($config.port)