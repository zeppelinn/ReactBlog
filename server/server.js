const express = require("express")
const blogRouter = require('./blog')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require('path')

const app = express()
const server = require('http').Server(app)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(function(req, res, next){
    if(req.url.startsWith('/blog/')){
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/blog', blogRouter)
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function(){
    console.log('Node app start on port 9093')
})
