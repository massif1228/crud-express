/**
 * 数据处理
 */

// 引包
var fs = require('fs')

// 获取所有学生信息
exports.find = function (callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

// 通过 id 获取单条数据信息
exports.findById = function (queryId, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var dbData = JSON.parse(data).students

        var needEditData = dbData.find(function (item) {
            return item.id === queryId
        })
        callback(null, needEditData)
    })
}

// 添加保存信息
exports.save = function (newData, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        // 将 db 中的字符串转化为数组对象
        var dbData = JSON.parse(data).students

        // 在新数据数组添加 id 数据
        if (dbData.length === 0) {
            newData.id = 1
        } else {
            newData.id = dbData[dbData.length - 1].id + 1
        }
        
        // 将新数据 push 到原数组中
        dbData.push(newData)

        // 将 push 好的数组转换为字符串
        var fileData = JSON.stringify({
            students: dbData
        })
        // 写入文件
        fs.writeFile('./db.json', fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

// 更新信息
exports.update = function (editedData, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var dbData = JSON.parse(data).students

        editedData.id = parseInt(editedData.id)

        var needEditData = dbData.find(function (item) {
            return item.id === editedData.id
        })

        for (var key in editedData) {
            needEditData[key] = editedData[key]
        }

        var fileData = JSON.stringify({
            students: dbData
        })

        fs.writeFile('./db.json', fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(err)
        })
    })
}

// 通过 id 删除单条数据信息
exports.delete = function (deleteDataId, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var dbData = JSON.parse(data).students

        var deleteData = dbData.findIndex(function (item) {
            return item.id === deleteDataId
        })

        dbData.splice(deleteData, 1)

        var fileData = JSON.stringify({
            students: dbData
        })

        fs.writeFile('./db.json', fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
