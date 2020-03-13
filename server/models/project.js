const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id: { type: ObjectId },
    title: { type: String, default:'' },
    backgroundImage: { type: String, default:''},
    backgroundColor: { type: String, default:''},
    thumbnailImage: { type: String, default:''},
    shareConfig: {
        shareWx: false,
        coverImage: { type:String, default:''},
        title: { type:String, default:''},
        description: { type:String, default:''}
    },
    pages: Schema.Types.Mixed,
    script: { type:String, default:''},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    screenWidth: { type:Number, default:1920},
    screenHeight: { type:Number, default:1080},
    pageMode: { type:String, default:'PC'},
    flipType: { type:Number, default:0},
    slideNumber: {type:Boolean, default:false},
    add_timer: Number,
    up_timer: Number,
    status: { type:Number, enum:[0,1], default:1},
    isPublish: { type:Boolean, default:false},
    isTemplate: { type:Boolean, default:false},
    members: [mongoose.Schema.Types.ObjectId],
},{timestamps: {createdAt:'created',updateAt:'updated'}})

const model = mongoose.model('project',schema,'project')

module.exports = model