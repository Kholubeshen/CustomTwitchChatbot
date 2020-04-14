const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const commandSchema = require('../database/models/commandSchema.js')

//Get All Commands
router.get('/get_all', function(req, res, ){
    //Get commands from database.
    commandSchema.find()
    .then(doc => {
        res.send(JSON.stringify(doc));
    })
    .catch(err => {
        console.log(err);
    })
});

//Add Command
router.post('/add', function(req, res, ){
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
                    message: "err."
                });
                break;
            default:
                console.log("err:",err);
                res.send({response:"Failure",
                message: `Unknown Error code: ${err.code}`
            })

        }
    })
})

router.post('/update', function(req, res, ){
    console.log("Body", req.body.id)
    let updatedSchema = commandSchema.findOneAndUpdate(
        {
            _id:req.body.id
        },
        {
            commandName:req.body.commandName,
            message:req.body.message,
            gcd:req.body.gcd,
            ucd:req.body.ucd
        },
        {
            useFindAndModify: false
        }
    )
    .then(doc => {
        res.send({
            response:"Success", 
        })
    })
    .catch(err => {
        console.log("Err:",err)
        res.send({
            message:"Database error"
        })
    })
});

router.post('/delete', function(req, res, ){
    console.log("Body", req.body)
    let deletedCommand = commandSchema.deleteOne(
        req.body
    , (err) => {
        if(err) {
            console.log("Error:", err)
            res.send({
                message:"Database Error",
                status: 500,
                error: err
            });
        } else {
            console.log("Successful deletion");
        }
    });
    res.send({
        message:"Command Removed Successfully",
        status: 200
    });
});
module.exports = router;