const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
    _id: { type: ObjectId },
    title: { type: String, default:'未命名项目' },
    coverImage: { type: String, default:''},
    description: { type: String, default:'一个项目设计完成了'},
    shareConfig: {
        shareWx: false,
        coverImage: { type:String, default:''},
        title: { type:String, default:'这是'},
        description: { type:String, default:'这是'}
    },
    pages: Schema.Types.Mixed,
    script: { type:String, default:''},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    width: { type:Number, default:375},
    height: { type:Number, default:611},
    pageMode: { type:String, default:'pc'},
    flipType: { type:Number, default:0},
    slideNumber: {type:Boolean, default:false},
    add_timer: Number,
    up_timer: Number,
    status: { type:Number, enum:[0,1], default:1},
    isPublish: { type:Boolean, default:false},
    isTemplate: { type:Boolean, default:false},
    members: [mongoose.Schema.Types.ObjectId],
},{timestamps: {createdAt:'created',updateAt:'updated'}})

const model = mongoose.model('page',schema,'page')

module.exports = model