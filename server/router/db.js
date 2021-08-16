const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "board"
});

module.exports = db;