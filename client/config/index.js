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
    isDevelop:(isDev||isTest),
    ...configDict[currrentConfigKey],
    canvasH5Width:375,
    canvasH5Height:644
}

export default configObj