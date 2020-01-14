const fs=require('fs')
class File{
    save(file,filePath){
        const reader=fs.createReadStream(file.path)
        const upStream=fs.createWriteStream(filePath)
        reader.pipe(upStream)
    }
    uploadToOss(){

    }
}

module.exports=new File()