const express = require('express');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const displayRoute = require('./routes/displayRoute');

const app = express();
const SERVER_PORT = 5000;
const connectToMongo = require('./db');
connectToMongo();

var cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.use('/user', userRoute);

app.use('/auth', authRoute);

app.use('/display', displayRoute);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on Port : ${SERVER_PORT}`);
});