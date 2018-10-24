const express = require("express")
const blogRouter = require('./blog')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const app = express()
const server = require('http').Server(app)

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/blog', blogRouter)
server.listen(9093, function(){
    console.log('Node app start on port 9093')
})
