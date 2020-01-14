const path =require('path')
const fs=require('fs')
const uploadImg=ctx=>{
    const file = ctx.request.files.file
    let timestamps=(new Date().getTime()).toString()
    let extname=path.extname(file.name)
    fs.existsSync(path.join(ctx.state.SERVER_PATH,'public/upload_static/images'))||fs.mkdirSync(path.join(ctx.state.SERVER_PATH,'public/upload_static/images'))
    const reader=fs.createReadStream(file.path)
    let filePath=path.join(ctx.state.SERVER_PATH,'public/upload_static/images'+`/${timestamps}${extname}/`)
    const upStream=fs.createWriteStream(filePath)
    let imageUrl=ctx.state.BASE_URL+'/upload_static/images/'+`${timestamps}${extname}`
    reader.pipe(upStream)
    return imageUrl
}

module.exports=uploadImg