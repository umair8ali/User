const express = require('express');     //Including Express
const router = express.Router();        //Creating Router from express
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    //Including jwt

router.post('/signup',(req,res,next) =>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{          //Convert the password into hashcode
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            //If password convert then save into the DataBase
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username:req.body.Username,
                password:hash,
                phone: req.body.Phone,
                email: req.body.Email,
                userType: req.body.Usertype
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

//For Login
router.post('/login',(req,res,next)=>{
    User.find({username:req.body.Username})     //Find the user by the username
    .exec()
    .then(user=>{
        if(user.length < 1)         //When there is no user
        {
            return res.status(401).json({
                msg: 'User is not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{       //user[0] First user of the password
            if(!result){
                res.status(401).json({
                    message: 'Password Incorrect'
                })
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,      //Passing the object to create token
                    userType:user[0].userType,
                    phone:user[0].phone,
                    email:user[0].email
                },
                'This is dummy text',{
                    expiresIn: '24h'                            //When will token expire automatically
                }
                );

                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    phone:user[0].phone,
                    email:user[0].email,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    }) 
})

module.exports = router;