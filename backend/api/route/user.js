const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const user = require('../models/user');
const bcrypt = require('bcrypt');
router.get(`/`, (req, res) => {
    user.find({}).sort({ $natural: -1 }).then((data) => {
        res.send(data);
    })
})

function checkEmail(req, res, next) {
    var email = req.body.email;
    var checkexitemail = user.findOne({ email: email });
    checkexitemail.exec((err, result) => {
        if (err) throw err;
        if (result) {
            return res.status(200).json({
                msg1: "Email Already Exits",
                doc: result
            });
        }
        next();
    });
}

router.post('/register', jsonParser, checkEmail, (req, res) => {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (err) {
            res.status(400).json({
                msg1: "Something wrong try later...!",
                doc: err
            });
        } else {
            console.log(req.body);
            const newUserForm = new user({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })
            await newUserForm.save().then((result) => {
                console.log(result);
                res.status(201).json({ "msg": "Inserted Successfully", doc: result });
            }).catch((e) => {
                res.status(500).json({ msg1: "Error" })
            })

        }

    })


})

router.post("/login", jsonParser, function (req, res, next) {
    var email = req.body.email;
    user.find({ email: email }).then((data) => {
        if (data.length < 1) {
            res.status(200).json({
                msg: "Authentication Failed",
                Userdata: '',
                status: 'Error'
            });
        } else {
            bcrypt.compare(req.body.password, data[0].password, function (err, result) {

                console.log(data[0].password);
                if (err) {
                    res.json({
                        msg: "Invalid Credentials",
                        userdata: '',
                        status: "Error"
                    })
                }
                if (result) {
                    res.status(200).json({
                        msg: "Login Successfull",
                        userdata: data,
                        status: "Success"
                    })
                } else {
                    res.json({
                        msg: "Enter Correct email & password",
                        userdata:'',
                        status: "Error"
                    })

                }

            })
        }
    })
    .catch((err)=>{
        res.json({
            error:err
        })
    })
});
module.exports = router;