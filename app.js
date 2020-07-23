/**
 * 引入相关包
 * 配置
 *  模板引擎
 *  开放静态文件夹资源
 *  配置 body-parser
 * 开通监听
 */

 //  引包
var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router.js')

// 启动 express
var app = express()

// 开放静态文件夹资源
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))

// 启动模板引擎
app.engine('html', require('express-art-template'))

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置路由服务
app.use(router)

// 开通监听
app.listen(3000, function () {
    console.log('server is running...')
})
