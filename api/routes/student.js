const express = require('express');     //Including Express
const router = express.Router();        //Creating Router from express
const mongoose = require('mongoose');
const Student = require('../model/student');

//To get the Entire Data from the DataBase
router.get('/', (req, res,next) =>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//For Particular Data from the DataBase
router.get('/:id', (req,res,next)=>{            //Catching the ID
    console.log(req.params.id);                 //Handle the ID
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// router.get('/', (req, res,next) => {
//     res.status(200).json({
//         msg:'This is student Get Request'       //When required data from database we use GET Request
//     })
// })

//Body Parser => Recieve and Store
// router.post('/', (req, res,next) => {
//     console.log(req.body);          //Data Recieving
// })

// router.post('/', (req, res,next) => {
//     console.log(req.body.Email);          //When recieving specific data
// })

router.post('/', (req, res,next) => {
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.Name,
        email:req.body.Email,
        phone:req.body.Phone,
        gender:req.body.Gender
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// router.post('/', (req, res,next) => {
//     res.status(200).json({
//         msg:'This is student Post Request'       //Post Request means updating the data
//     })
// })


//Delete Request
router.delete('/:id', (req, res,next) =>{           //After / <- this whatever has it's called Params
    Student.deleteOne({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            message: 'Data is deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err           //error is property and "err" produces a default error msg of Node JS
        })
    })
})

//Put Request
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.Name,
            email:req.body.Email,
            phone:req.body.Phone,
            gender:req.body.Gender
        }
    })
    .then(result =>{
        res.status(200).json({
            record_updated:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err 
        })
    })
})

module.exports = router; 