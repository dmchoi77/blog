const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const db = require('./db');
const boardNew = require('./boardNew');
const signUp = require('./signUp');    

app.use('/', db);
app.use('/',boardNew);
app.use('/', signUp);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
});
