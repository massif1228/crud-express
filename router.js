/**
 * 路由文件
 */

// 引包
var express = require('express')
var dataServer = require('./student.js') 

// 配置路由
var router = express.Router()

// 主页
router.get('/students', function (req, res) {
    dataServer.find(function (err, ret) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('./index.html', {
            studentsInf: ret
        })
    })
})

// 添加学生页面
router.get('/students/new', function (req, res) {
    res.render('./new.html')
})

// 提交学生页面
router.post('/students/new', function (req, res) {
    // new dataServer(req.body).save(function (err) {
    //     if (err) {
    //         res.status(500).send('server error.')
    //     }
    //     res.redirect('/students')
    // })

    new dataServer(req.body).save().then(() => res.redirect('/students'))

    // })
    // dataServer.save(req.body, function (err) {
    //     if (err) {
    //         return res.status(500).send('server error.')
    //     }
    //     res.redirect('/students')
    // })
})

// 修改信息页面
router.get('/students/edit', function (req, res) {
    dataServer.findById(req.query.id).then((ret) => res.render('./edit.html', {
        student: ret
    }))

    // dataServer.findById(parseInt(req.query.id), function(err, studentInfById) {
    //     if (err) {
    //         return res.status(500).send('server error.')
    //     }
    //     res.render('./edit.html', {
    //         student: studentInfById
    //     })
    // }) 
})

// 提交修改
router.post('/students/edit', function (req, res) {
    dataServer.findByIdAndUpdate(req.body.id, req.body).then((err) => res.redirect('/students'))

    // dataServer.update(req.body, function (err) {
    //     if (err) {
    //         return res.status(500).send('error server.')
    //     }
    //     res.redirect('/students')
    // })
})

// 请求删除
router.get('/students/delete', function (req, res) {
    dataServer.findByIdAndDelete(req.query.id).then(() => res.redirect('/students'))

    // dataServer.delete(parseInt(req.query.id), function (err) {
    //     if (err) {
    //         return res.status(500).send('server error.')
    //     }
    //     res.redirect('/students') 
    // })
})

// 部署外接端口
module.exports = router
