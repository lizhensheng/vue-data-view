const config = require('../../config.json')
const mongoose = require('mongoose').set('debug',true)
const options = {
    autoReconnect: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const url = `mongodb://${config.db.user}:${config.db.pass}@${config.db.servername}:${config.db.port}/${config.db.DATABASE}`

module.exports = {
    connect: ()=>{
        mongoose.connect(url,options)
        let db = mongoose.connection
        db.on('error',console.error.bind(console,'连接错误'))
        db.once('open',()=>{
            console.log('mongodb connect success')
        })
    }
}