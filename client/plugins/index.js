

import Text from './text'
import Image from './image'
import Carousel from './carousel'
import RectangleBorder from './rectangle-border'
import Iframe from './iframe'
import Button from './button'
import Input from './input'
import Textarea from './textarea'
import bgMusic from './bg-music'
import BaseForm from './baseform'
import ScrollForm from './scrollform'
import ScrollText from './scrolltext'
import DatePicker from './datepicker'
import Select from './select'
import Chartline from './chartline'
import Chartcolumnar from './chartcolumnar'
import Chartmap from './chartmap'
import Chartpie from './chartpie'
import Breadcrumb from './breadcrumb'

const components = [
	Text,
	Image,
	Carousel,
	RectangleBorder,
	Iframe,
	Button,
	Input,
	Textarea,
	bgMusic,
	BaseForm,
	Breadcrumb,
    ScrollForm,
	ScrollText,
	DatePicker,
	Select,
	Chartline,
	Chartcolumnar,
	Chartmap,
	Chartpie
]
const install = function (Vue){
    if(install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name,component))
}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

let _c_register_components_object = {};
components.forEach(item => {
	_c_register_components_object[item.name] = item
})

export {
	Text,
	Image,
	Carousel,
	RectangleBorder,
	Iframe,
	Button,
	Input,
	Textarea,
	bgMusic,
	BaseForm,
	Breadcrumb,
    ScrollForm,
	ScrollText,
	Chartline,
	Chartcolumnar,
	Chartmap,
	Chartpie,
    _c_register_components_object
}

export default {
	install,
	// 所有组件，必须具有 install，才能使用 Vue.use()
}
