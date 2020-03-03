const Menu=require('../models/menu')
const router=require('koa-router')()
const mongoose=require('mongoose')
/**
 *  获取菜单列表
 */
router.get('/info',async ctx=>{
    let result=await Menu.find({})
    //把平行数据转成树形数据
    let mainMenu = []
    let subMenu = []
    mainMenu = result.filter(function(t){return t.pid === 0})
    subMenu = result.filter(function(t){return t.pid !== 0})
    let menuList = []
    for (let index = 0; index < mainMenu.length; index++) {
        const mainItem = mainMenu[index];
        menuList.push({
            id:mainItem.id,
            pid:mainItem.pid,
            name:mainItem.name,
            iconClass:mainItem.iconClass,
            routerPath:mainItem.routerPath,
            children:[]
        })
        for (let findex = 0; findex < subMenu.length; findex++) {
            const subItem = subMenu[findex];
            if(subItem.pid === mainItem.id){
                menuList[index].children.push(subItem)
            }
        }
    }
    ctx.body= menuList
})

router.get('/add',async ctx=>{
    let dataArray = [{
                id: 1,
                name: '总览',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 2,
                name: '项目管理',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/project-create'
            },{
                id: 3,
                name: '资源管理',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 4,
                name: '设备管理',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 5,
                name: '安全管理',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 6,
                name: '数据服务',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 7,
                name: '系统管理',
                pid: 0,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 8,
                name: '菜单管理',
                pid: 7,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            },{
                id: 9,
                name: '用户管理',
                pid: 7,
                iconClass: 'el-icon-s-platform',
                routerPath: '/'
            }]
    for (let index = 0; index < dataArray.length; index++) {
        const element = dataArray[index];
        await Menu.create({
            ...element,
            _id: mongoose.mongo.ObjectId()
        })
    }
    ctx.body='插入数据成功'
})
module.exports=router