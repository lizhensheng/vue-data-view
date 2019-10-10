//服务发现和注册
export class Subject{
    constructor(){
        this.Observers=[]
    }
    add(observer){
        this.Observers.push(observer)
    }
    remove(observer){
        this.Observers.filter(item=>item.name === observer.name)
    }
    get(){
        return this.Observers
    }
}
//服务单元
export class Observer {
    constructor(name,group,addr) {
        this.name = name
        this.group = group
        this.addr = addr
    }
}

export function initObserver() {
    let observer1 = new Observer('用地预审v1',"配置bar","/api/bar/ydys/v1")
    let observer2 = new Observer('用地预审v2',"配置bar","/api/bar/ydys/v2")
    let observer3 = new Observer('用地预审v3',"配置line","/api/line/ydys/v3")
    let subject = new Subject()
    subject.add(observer1)
    subject.add(observer2)
    subject.add(observer3)
    return subject.get()
}

export function normalize() {
    let map = []
    let obj = initObserver()
    obj.forEach((item)=>{
        if(map.findIndex((m)=>{return m.label == item.group}) == -1){
            map.push({
                label:item.group,
                options:[]
            })
        }
        let index = map.findIndex((m)=>{
            return m.label == item.group
        })
        map[index].options.push({
            value: item.addr,
            label: item.name
        })
    })
    return map
}