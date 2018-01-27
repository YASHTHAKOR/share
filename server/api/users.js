import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Authenticate from '../middleware/authenticate';
import config from '../config';
import user from '../model/user'

let router = express.Router();


router.get('/',Authenticate,function(req,res) {
    user.find()
        .exec()
        .then(function(data,err) {
            res.send(data);
        })
});

router.post('/signup',function(req,res) {

    if(!req.body.password) {
        res.status(400).send('please add password');
        return;
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            var userdata = {
                email: req.body.email,
                salt: salt,
                password: hash,
                userName: req.body.userName,
                companyName: req.body.companyName,
                isAdmin: true
            };
            user.create(userdata)
                .then(function(data,err) {
                    console.log(data);
                    res.send({success: 'registration successful'})
                })
        });
    });

});

router.post('/signin',function(req,res) {
    user.findOne({email:req.body.email})
        .exec()
        .then(function(users,err) {
            if(!users) {
                res.status(404).send('no user found');
                return;
            }
            bcrypt.hash(req.body.password,users.salt,function(err,hash) {
                if(hash === users.password) {
                    let tokendata = {
                        _id: users._id,
                        email: users.email,
                        userName: users.userName,
                        companyName: users.companyName,
                        isAdmin: users.isAdmin
                    };
                    let token = jwt.sign({
                        tokendata
                    }, config.jwtSecret, { expiresIn: '1h' });
                    res.send(token);
                } else {
                    res.status(401).send('invalid credentials')
                }
            })
        })
});

module.exports = router;