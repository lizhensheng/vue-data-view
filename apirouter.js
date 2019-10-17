const express = require('express');
const Mock = require('mockjs');
let apiRoutes = express.Router()
const userController = require('./src/server/controller/user')
const checkToken = require('./src/server/token/check-token')
apiRoutes.get('/bar/ydys/v1', function (req, res) {
    //建设用地审批
    let json = Mock.mock({
        "array|4": [
            {
                "TJDATE":function(){
                    return Mock.mock('@date("yyyy/MM")')
                },
                "ARECODE":150000,
                "GWYPZZMJ|1-100":1,
                "SZFPZZMJ|1-100":1
            }
        ],
        "tags":[
            {
                "value":"TJDATE",
                "label":"月份"
            },
            {
                "value":"ARECODE",
                "label":"行政区"
            },
            {
                "value":"GWYPZZMJ",
                "label":"国务院批准总面积"
            },
            {
                "value":"SZFPZZMJ",
                "label":"省政府批准总面积"
            }
        ]
    })
    res.json(json)
});
/**
 * 登录
 */
apiRoutes.post('/login',userController.login);
/**
 * 注册
 */
apiRoutes.post('/register',userController.reg);
/**
 * 获取所有用户
 */
apiRoutes.get('/user', checkToken,userController.getAllUser);
/**
 * 删除某个用户
 */
apiRoutes.post('/delUser', checkToken,userController.delUser);

module.exports = apiRoutes