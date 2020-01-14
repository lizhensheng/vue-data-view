

// 基础组件
import Text from './text'
import Image from './image'
import ImageCarousel from './image-carousel'
import RectangleBorder from './rectangle-border'
import Iframe from './iframe'
import Button from './button'

// 表单组件
import Input from './input'
import Textarea from './textarea'

// 功能组件
import bgMusic from './bg-music'

// 业务组件
import Baseform from './baseform'
import Scrollform from './scrollform'
import Simpletext from './simpletext'

const components = [
    // 基础组件
	Text,
	Image,
	ImageCarousel,
	RectangleBorder,
	Iframe,
	Button,
	// 表单组件
	Input,
	Textarea,
	// 功能组件
	bgMusic,
	// 业务组件
    Baseform,
    Scrollform,
    Simpletext
]
const install = function (Vue){
    if(install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name,component))
}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

let _qk_register_components_object = {};
components.forEach(item => {
	_qk_register_components_object[item.name] = item
})

export {
    Text,
	Image,
	ImageCarousel,
	RectangleBorder,
	Iframe,
	Button,
	bgMusic,
	Input,
	Textarea,
    Baseform,
    Scrollform,
    Simpletext,
    _qk_register_components_object
}

export default {
	install,
	// 所有组件，必须具有 install，才能使用 Vue.use()
}
