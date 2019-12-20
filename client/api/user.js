import instance from "../axios"

//用户注册
export function userRegister(data){
    return instance.post('/api/register', data);
}
//用户登录
export function userLogin(data){
   return instance.post('/api/login', data);
}
//获取用户
export function getUser(){
    return instance.get('/api/user');
}
//删除用户
export function delUser(data){
    return instance.post('/api/delUser', data);
}