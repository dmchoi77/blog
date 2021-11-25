const mongoose = require('mongoose')
const offset = new Date().getTimezoneOffset() * 60000;

const boardSchema = mongoose.Schema({
    index: {
        type: Number,
        unique: 1,
        maxlength: 10
    },
    title: {
        type: String,
        maxlength: 50
    },
    content: {
        type: String,
        minlength: 0
    },
    date: {
        type: String,
        required: true,
        default: new Date(Date.now() - offset).toISOString().substr(0, 10)
    },
    writer: {
        type: String,
    },
    url: {
        type: String,
    },
    view: {
        type: Number,
        default: 0
    },
    visible: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        default: 0
    },
    token: { // 유효성 검사
        type: String
    }
})


const Board = mongoose.model('Board', boardSchema)

module.exports = { Board }