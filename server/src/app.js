const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const tweetRouter = require('./routes/tweet');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


app.use('/user',userRouter);
app.use('/tweet',tweetRouter);
console.log("Server Started for Express Wallet on port 3000!");
app.listen(3000);

module.exports=app;