const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const db = require('./router/db');
const boardManage = require('./router/boardManage');
const boardList = require('./router/boardList');
const signUp = require('./router/signUp');
const view = require('./router/view');
const userInform = require('./router/userInform');

app.use(cors());
app.use(express.json({
    limit: "50mb",
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));


app.use('/', boardManage);
app.use('/', boardList);
app.use('/', signUp);
app.use('/', view);
app.use('/', userInform);

app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
});