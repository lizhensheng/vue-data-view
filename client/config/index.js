import $config from '../../config'


const configDict={
    development:{
        baseURL:'http://localhost:4000'
    },
    production:{
        baseURL:$config.baseURL
    }
}

const currrentConfigKey=process.env.NODE_ENV
const isDev = process.env.NODE_ENV==='development'
const isTest=process.env.NODE_ENV==='development'

const configObj={
    isDevelop: (isDev||isTest),
    ...configDict[currrentConfigKey],
    leftPanelWidth: 332,
    screenPixelWidth: 1920,
    screenPixelHeight: 1080,
    editorWrapPanelWidth: 2320,
    editorWrapPanelHeight: 1480,
    thumbnailWidth: 190,
    thumbnailHeight: 110
}

export default configObj