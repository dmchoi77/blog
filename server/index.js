const express = require('express');
const PORT = process.env.port || 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser')
const board = require('./router/board');
const login = require('./router/login');
const view = require('./router/view');
const image = require('./router/image');
const comment = require('./router/comment');
const mongoose = require('mongoose');
const config = require('./config/key');

const app = express();

mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors(
));
app.use(express.json({
    limit: "50mb",
}));


app.use('/', board);
app.use('/', login);
app.use('/', view);
app.use('/', comment);
app.use('/', image);
app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
});