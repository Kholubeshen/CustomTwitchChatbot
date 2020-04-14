//Server

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const indexRouter = require('./routes/index');
const formRouter = require('./routes/form');
const commandsRouter = require('./routes/commands')
const app = express();
const database = require('./database/database.js');
const chatbot = require('./chatbot');


let port = 9001;
app.set('port', port)

let server = http.createServer(app);

server.listen(port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/index', indexRouter);
app.use('/form', formRouter);
app.use('/commands', commandsRouter);

app.get('/', (req, res) => {
    res.send('Test message!');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send({Response: "Server received POST"});
})

app.listen(9000, () => console.log(`Listening on port ${port}`));

module.exports = app;

// //Chatbot

// //OBS Websocket
// const OBSWebSocket = require('obs-websocket-js');
// const obs = new OBSWebSocket();

// //Database
// const MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/Chatbot"

// MongoClient.connect(url, function(err, db) {
//     if(err) {
//         throw err
//     } else {
//         console.log("Database Connected");

//         db.close();
//         console.log("Database Connection closed");
//     }
// });

// Database using Mongoose
// const mongoose = require('mongoose');
// let dbUrl = "mongodb://localhost:27017/Chatbot"

// await mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });