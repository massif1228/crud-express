var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/itcast', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
});

module.exports = mongoose.model('Student', studentSchema);

// var studentNewData = new Student({
//     name: 'jack',
//     gender: 1,
//     age: 18,
//     hobbies: '睡觉'
// });

// studentNewData.save().then(() => console.log('ok'));

// OR
// module.exports = mongoose.model('Student', {
//     name: {

//     }
// })
