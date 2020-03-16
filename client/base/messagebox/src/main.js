const defaults = {
    title: '',
    message: '',
    iconClass: '',
    closeOnClickModal: true,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
}

import Vue from 'vue'
import msgboxVue from './main.vue'

const MessageBoxConstructor = Vue.extend(msgboxVue)

let currentMsg,instance
let msgQueue = []

const defaultCallback = action => {
    if(currentMsg){
        let callback = currentMsg.callback
        if(typeof callback === 'function'){
            callback(action)
        }
    }
}

const initInstance = () => {
    instance = new MessageBoxConstructor({
        el: document.createElement('div')
    })

    instance.callback = defaultCallback
}

const showNextMsg = () => {
    if(!instance){
        initInstance()
    }
    instance.action = ''

    if(!instance.visible){
        if(msgQueue.length > 0){
            currentMsg = msgQueue.shift();
            
            let options = currentMsg.options
            for(let prop in options){
                if(options.hasOwnProperty(prop)){
                    instance[prop] = options[prop]
                }
            }
            if(options.callback === undefined)[
                instance.callback = defaultCallback
            ]

            let oldCb = instance.callback
            instance.callback = (action, instance) => {
                oldCb(action, instance)
                showNextMsg();
            }
            if(instance.closeOnClickModal === undefined){
                instance.closeOnClickModal = true
            }
            document.body.appendChild(instance.$el)

            Vue.nextTick(() => {
                instance.visible = true
            })
        }
    }
}

const MessageBox = function(options, callback){
    if(typeof options === 'string'){
        options = {
            message: options
        }
    } else if(options.callback && !callback){
        callback = options.callback
    }

    msgQueue.push({
        options: Object.assign({}, defaults, options),
        callback: callback
    })
    
    showNextMsg()
}

MessageBox.alert = (message, title, options) => {
    if(typeof title === 'object'){
        options = title
        title = ''
    } else if(title === undefined){
        title = ''
    }
    return MessageBox(Object.assign({
        title: title,
        messag: message,
        closeOnClickModal:false
    }, options))
}

MessageBox.confirm = (message, title, options) => {
    if(typeof title === 'object'){
        options = title
        title = ''
    } else if(title === undefined){
        title = ''
    }
    return MessageBox(Object.assign({
        title: title,
        message: message,
        showCancelButton: true
    }, options))
}

export default MessageBox
export { MessageBox }