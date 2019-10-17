const {user} = require('../db/db')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const sha1 = require('sha1')
const createToken = require('../token/create-token')

/**
 * 根据用户名查找用户
 * @param username
 */
const findUser = (username) => {
    return new Promise((resolve,reject)=>{
        // eslint-disable-next-line no-console
        console.log(user)
        user.findOne({username},(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}
/**
 * 找到所有用户
 */
const findAllUsers = () => {
    return new Promise((resolve,reject)=>{
        user.find({},(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}
/**
 * 删除某个用户
 * @param id
 */
const _delUser = (id) => {
    return new Promise((resolve,reject)=>{
        user.findOneAndRemove({_id:id},err=>{
            if(err){
                reject(err)
            }
            resolve()
        })
    })
}
/**
 * 登录
 * @param req
 * @param res
 */
const login = function (req,res) {
    let username = req.body['name']
    let password = sha1(req.body['pass'])
    findUser(username).then((doc)=>{
        if(!doc){
            console.log('检查到用户名不存在')
            res.json({
                info:false
            })
        }else if(doc.password === password){
            console.log('密码一致!')

            let token = createToken(username)
            console.log(token)
            doc.token = token
            doc.save((err)=>{
                if(err){
                    console.log(err)
                    res.json({
                        success:false
                    })
                }else{
                    res.json({
                        success:true,
                        username,
                        token,
                        create_time:doc.create_time
                    })
                }
            })
        }else{
            console.log('密码错误')
            res.json({
                success:false
            })
        }
    })
}
/**
 * 注册
 * @param req
 * @param res
 */
const reg = function (req,res) {
    let u = new user({
        username:req.body["name"],
        password:sha1(req.body["pass"]),
        token:createToken(this.username)
    })
    u.create_time = moment(objectIdToTimestamp(u._id)).format('YYYY-MM-DD HH:mm:ss')
    findUser(u.username).then((doc)=>{
        if(doc){
            res.json({
                success:false
            })
        }else{
            u.save((err)=>{
                if(err){
                    console.log(err)
                    res.json({
                        success:false
                    })
                }else{
                    console.log('注册成功')
                    res.json({
                        success:true
                    })
                }
            })
        }
    })
}
/**
 * 获得所有用户信息
 * @param req
 * @param res
 */
const getAllUser = function (req,res) {
    findAllUsers().then((doc)=>{
        res.json({
            success:'成功',
            result: doc
        })
    })
}
/**
 * 删除某个用户
 * @param req
 * @param res
 */
const delUser = function (req,res) {
    //拿到要删除的用户id
    let id = req.body["id"]
    _delUser(id).then((doc)=>{
        res.json({
            success:'删除成功'
        })
    })
}
module.exports = {
    login,
    reg,
    getAllUser,
    delUser
}
