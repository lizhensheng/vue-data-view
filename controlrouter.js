const express = require('express')
const axios = require('axios')
let controlRoutes = express.Router()
controlRoutes.post('/onDragInControl',(req,res)=>{
    axios.post('http://localhost:4444/control/onDragInControl',req.body).then(response=>{
        res.json(response.data)
    }).catch((e)=>{
        console.log(e)
    })
})
module.exports =  controlRoutes