const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const db = require('./router/db');
const boardNew = require('./router/boardNew');
const boardList = require('./router/boardList');
const signUp = require('./router/signUp');
const view = require('./router/view');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',boardNew);
app.use('/',boardList);
app.use('/',signUp);
app.use('/',view);


app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
});

    