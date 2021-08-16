const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "board"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM TABLE1";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const today = new Date().toISOString().substr(0, 10);
    const sqlQuery = `INSERT INTO TABLE1 (title, content, date) values (?,?,"${today}")`;

    //제목이나 본문이 공백일 경우 client로 null 전송하며 쿼리 실행X             
    if (title === "" || content === "") {
        res.send("null!");
        return;
    }

    db.query(sqlQuery, [title, content], (err, result) => {
        res.send('Success!');
    });
});

app.post("/api/signup", (req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;

    const sqlQuery = `INSERT INTO USER (name, id, password) VALUES (?, ?, ?)`;

    db.query(sqlQuery,[name, id, password], (err,result)=>{
        res.send('Sign up!');
    })
})

app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
});

    