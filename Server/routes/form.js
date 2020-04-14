// @ts-check
const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const commandSchema = require('../database/models/commandSchema.js')

router.post('/', function(req, res, ){
    console.log('Received Form Submission. Body: \n',req.body);

    const command = new commandSchema({
        enabled: true,
        commandName: req.body.commandName,
        message: req.body.message,
        gcd: req.body.gcd,
        ucd: req.body.ucd,
    })

    command.save()
        .then(doc => {
            console.log("Doc: ", doc);
            res.send({
                response:"Success",
                message: "Added command to database"
            });
        })
        .catch(err => {
            console.log("ErrCode:", err.code);
            switch(err.code){
                case 11000: //Duplicate Key
                    res.send({
                        response: "Failure",
                        message: "Duplicate command name."
                    });
                    break;
                default:

            }
            // console.log('Err: ', err);
        })
    //Send data to database to be stored.
    


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
});

module.exports = router;